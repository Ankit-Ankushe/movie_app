import { Divider, List, Modal } from 'antd'
import Paragraph from 'antd/es/typography/Paragraph';
import Title from 'antd/es/typography/Title';
import React from 'react'
import '../Pages/Home.css';


const MovieModal = ({ selectedMovie, isModalVisible, handleCancel }) => {
  console.log("clicked", isModalVisible)
  if (!selectedMovie) return null;
  return (
    <div>
      <Modal
        title={selectedMovie.Title}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <img
          alt={selectedMovie.Title}
          src={selectedMovie.Poster}
          style={{ width: '100%', maxHeight: '200px', objectFit: 'contain' }}
        />
        <Title level={3}>{selectedMovie.Title}</Title>
        <Paragraph><strong>Year:</strong> {selectedMovie.Year}</Paragraph>
        <Paragraph><strong>Genre:</strong> {selectedMovie.Genre}</Paragraph>
        <Paragraph><strong>Plot:</strong> {selectedMovie.Plot}</Paragraph>
        <Paragraph><strong>Ratings:</strong></Paragraph>
        <List
          dataSource={selectedMovie.Ratings}
          renderItem={item => (
            <List.Item style={{ padding: '0' }}>
              <strong>{item.Source}:</strong> {item.Value}
            </List.Item>
          )}
          style={{ marginBottom: '0' }}
        />
      </Modal>
    </div >
  )
}

export default MovieModal