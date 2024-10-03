import React, { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import Card from './Card.jsx';
import Modal from './Modal.jsx';

const PAGE_SIZE = 30; 

function App() {
  const [selectedUser, setSelectedUser] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['users'],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetch(`https://9e06da9a-97cf-4701-adfc-9b9a5713bbb9.mock.pstmn.io/users?page=${pageParam}&limit=${PAGE_SIZE}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    getNextPageParam: (lastPage) => {
      return lastPage.data.users.length < PAGE_SIZE ? undefined : lastPage.page + 1;
    }
  });

  const handleCardClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const { ref } = useInView({
    onEnter: () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    threshold: 1.0,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data: {error.message}</p>;

  const CardLayout = () => (
    data.pages.map((page) => (
      page.data.users.map(user => (
        <Card 
          key={user.id} 
          firstName={user.firstname} 
          lastName={user.lastname} 
          profilePic={user.avatar} 
          onClick={() => handleCardClick(user)} 
        />
      ))
    ))
  );

  return (
    <>
      <div className="cards-container">
        <CardLayout />
        {isFetchingNextPage && <p>Loading more...</p>}
        <div ref={ref} style={{ height: '20px' }} /> 
      </div>
      {isModalOpen && (
        <Modal 
          user={selectedUser} 
          closeModal={closeModal} 
        />
      )}
    </>
  );
}

export default App;