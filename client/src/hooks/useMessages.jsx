import React, { useEffect, useRef, useCallback } from 'react';
import { useGetMessagesInfiniteQuery } from '../service/message/messageService';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/chat/chatSlice';

const useMessages = (limit = 10) => {
    const userId = useSelector(state => state.chat.user?._id);
    const dispatch = useDispatch();
    const loadingRef = useRef(null);
    const observerRef = useRef(null);
    
    // Use infinite query hook
    const {
        data,
        isFetching,
        isLoading,
        isError,
        hasNextPage,
        fetchNextPage,
        refetch
    } = useGetMessagesInfiniteQuery(
        { userId, limit },
        { 
            skip: !userId,
            refetchOnMountOrArgChange: true
        }
    );

    // Flatten all pages into single array and update Redux
    useEffect(() => {
        if (data?.pages) {
            const allMessages = data.pages.flat();
            dispatch(setMessages(allMessages));
        }
    }, [data, dispatch]);

    // Load more messages when intersection observed
    const loadMore = useCallback(() => {
        if (hasNextPage && !isFetching) {
            fetchNextPage();
        }
    }, [hasNextPage, isFetching, fetchNextPage]);

    // Setup intersection observer
    useEffect(() => {
        const loadingElement = loadingRef.current;
        
        if (!loadingElement) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadMore();
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(loadingElement);
        observerRef.current = observer;

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [loadMore]);

    return {
        loadingRef,
        hasMore: hasNextPage,
        isFetching,
        isLoading,
        isError,
        refetch
    };
};

export default useMessages;