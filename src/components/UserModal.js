import { useEffect } from "react";
import { Modal, Form, Input, Select } from "antd";
import "./UserModal.css";

const { Option } = Select;

function UserModal({ data, onSave, onCancel }) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (data && data.id) form.setFieldsValue(data);
    else form.resetFields();
  }, [data, form]); 

  return (
    <Modal
      open={!!data}
      title={data?.id ? "Edit User" : "Add User"}
      onCancel={onCancel}
      onOk={() => form.submit()}
      className="user-modal"
    >
      <Form form={form} onFinish={onSave} layout="vertical">
        <Form.Item name="id" hidden>
          <Input type="hidden" />
        </Form.Item>

        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="email" label="Email" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
          <Select>
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default UserModal;
