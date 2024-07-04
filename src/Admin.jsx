import React, { useContext, useState } from 'react';
import { Table, Button, Modal, Form, Input, Space } from 'antd';
import { StudentContext } from './StudentContext';

const Admin = () => {
  const { students, addStudent, updateStudent, deleteStudent } = useContext(StudentContext);
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

  const handleGenerateCertificate = (student_id) => {
    // Logic to generate certificate goes here
    console.log(`Generating certificate for student with ID: ${student_id}`);
  };

  const columns = [
    { title: 'Student ID', dataIndex: 'student_id', key: 'student_id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Course', dataIndex: 'course', key: 'course' },
    { title: 'Batch', dataIndex: 'batch', key: 'batch' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    {
      title: 'Generate Certificate',
      key: 'Generate Certificate',
      render: (_, record) => (
        <Space>

          <Button onClick={() => handleGenerateCertificate(record.student_id)}>Generate Certificate</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1>Admin Panel</h1>
      <Table dataSource={students} rowKey="student_id" columns={columns} />

      <Modal
        title={editingStudent ? 'Edit Student' : 'Add Student'}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingStudent(null);
        }}
        footer={null}
      >
        <Form initialValues={editingStudent} onFinish={handleAddEdit}>
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

export default Admin;
