import React, { useState, useContext } from 'react';
import { Table, Button, Input, Space, Modal, Form } from 'antd';
import { StudentContext } from './StudentContext';

const { Search } = Input;

const Students = () => {
  const { students, addStudent, updateStudent, deleteStudent } = useContext(StudentContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  const handleAddEdit = (values) => {
    if (editingStudent) {
      updateStudent({ ...editingStudent, ...values });
    } else {
      addStudent({ ...values, student_id: Date.now().toString() });
    }
    setIsModalVisible(false);
    setEditingStudent(null);
  };

  const handleEdit = (record) => {
    setEditingStudent(record);
    setIsModalVisible(true);
  };

  const handleDelete = (student_id) => {
    deleteStudent(student_id);
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  const filteredData = students.filter(student => student.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div>
      <h1>Students Page</h1>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={() => setIsModalVisible(true)}>Add Student</Button>
        <Search
          placeholder="Search students"
          onSearch={handleSearch}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ width: 200 }}
        />
      </Space>
      <Table dataSource={filteredData} rowKey="student_id" columns={[
        { title: 'Student ID', dataIndex: 'student_id', key: 'student_id' },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Course', dataIndex: 'course', key: 'course' },
        { title: 'Batch', dataIndex: 'batch', key: 'batch' },
        { title: 'Status', dataIndex: 'status', key: 'status' },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <Space>
              <Button onClick={() => handleEdit(record)}>Edit</Button>
              <Button danger onClick={() => handleDelete(record.student_id)}>Delete</Button>
            </Space>
          ),
        },
      ]} />
      <Modal
        title={editingStudent ? 'Edit Student' : 'Add Student'}
        open={isModalVisible} // Use 'visible' instead of 'open'
        onCancel={() => {
          setIsModalVisible(false); // Close modal when clicking 'x' icon
          setEditingStudent(null);
        }}
        footer={null}
      >
        <Form
          initialValues={editingStudent}
          onFinish={handleAddEdit}
        >
          <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input the name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="course" label="Course" rules={[{ required: true, message: 'Please input the course!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="batch" label="Batch" rules={[{ required: true, message: 'Please input the batch!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="status" label="Status" rules={[{ required: true, message: 'Please input the status!' }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingStudent ? 'Save' : 'Add'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Students;
