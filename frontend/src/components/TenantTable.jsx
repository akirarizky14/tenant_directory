import { Button, Space, Table } from 'antd';
import UnitSelect from './UnitSelect';

function TenantTable({ tenants, units, loading, busy, onEdit, onDelete, onAssign }) {
  const columns = [
    { title: 'Nama', dataIndex: 'nama' },
    { title: 'Kategori', dataIndex: 'kategori' },
    {
      title: 'Unit',
      render: (_, tenant) => (
        <UnitSelect tenant={tenant} units={units} busy={busy} onAssign={onAssign} />
      ),
    },
    {
      title: 'Aksi',
      render: (_, tenant) => (
        <Space>
          <Button onClick={() => onEdit(tenant)} disabled={busy}>Ubah</Button>
          <Button danger onClick={() => onDelete(tenant)} disabled={busy}>Hapus</Button>
        </Space>
      ),
    },
  ];

  return (
    <Table
      rowKey="tenant_id"
      columns={columns}
      dataSource={tenants}
      loading={loading}
      pagination={false}
      locale={{ emptyText: 'Tidak ada tenant' }}
    />
  );
}

export default TenantTable;