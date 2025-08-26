import { useEffect, useState } from "react";
import { Table, Button,message, Select, Spin } from "antd";
import api from "./api";
import UserModal from "./components/UserModal";
import "./App.css";

const { Option } = Select;

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("All");
  const [modalData, setModalData] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/users");
      setUsers(res.data.filter(u => !u.deleted));
    } catch (err) {
      message.error("Failed to fetch users");
    }
    setLoading(false);
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleSave = async (user) => {
    if (user.id) {
      await api.patch(`/users/${user.id}`, user)
      message.success("User updated");
    } else {
      await api.post("/users", user);
      message.success("User added");
    }
    fetchUsers();
    setModalData(null);
  };

  const handleDelete = async (id) => {
    await api.patch(`/users/${id}`, { deleted: true });
    message.success("User deleted");
    fetchUsers();
  };

  const filteredUsers = users.filter(u =>
    filter === "All" ? true : u.gender === filter
  );

  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "Email", dataIndex: "email" },
    { title: "Gender", dataIndex: "gender" },
    {
      title: "Actions",
      render: (_, record) => (
        <>
          <Button style={{ marginRight: 10 }} onClick={() => setModalData(record)}>Edit</Button>
          <Button danger onClick={() => handleDelete(record.id)}>Delete</Button>
        </>
      )
    }
  ];

  return (
    <div className="dashboard-app">
      <h1>User Management Dashboard</h1>
      <div className="dashboard-card">
        <Button type="primary" onClick={() => setModalData({})}>
          Add User
        </Button>
        <Select value={filter} onChange={setFilter} style={{ marginLeft: 10 }}>
          <Option value="All">All</Option>
          <Option value="Male">Male</Option>
          <Option value="Female">Female</Option>
        </Select>
        {loading ? (
          <Spin style={{ marginTop: 20 }} />
        ) : (
          <Table rowKey="id" dataSource={filteredUsers} columns={columns} />
        )}
      </div>
      <UserModal
        data={modalData}
        onSave={handleSave}
        onCancel={() => setModalData(null)}
      />
    </div>
  );
}

export default App;
