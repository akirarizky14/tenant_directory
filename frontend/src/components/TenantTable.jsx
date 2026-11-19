import { Button, Space, Table } from 'antd';
import UnitSelect from './UnitSelect';

function TenantTable({ tenants, units,sort, page,limit,total,loading, busy, onEdit, onDelete, onAssign, onPageChange, onSortChange }) {
  const urutanKolom = (key) => {
    if (sort.field !== key) return null;
    return sort.order === 'asc' ? 'ascend' : 'descend';
  };
  const columns = [
    { title: 'Nama', dataIndex: 'nama', key: 'nama', sorter: true, sortOrder: urutanKolom('nama') },
    { title: 'Kategori', dataIndex: 'kategori' },
    {
      title: 'Unit',
      key:'lantai',
      sorter: true,
      sortOrder: urutanKolom('lantai'),
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
  const handleChange = (pagination, filters, sorter, extra) => {
    if (extra.action === 'paginate') onPageChange(pagination.current);
    if (extra.action === 'sort') onSortChange(sorter.columnKey, sorter.order);
  };
  return (
    <Table
      rowKey="tenant_id"
      columns={columns}
      dataSource={tenants}
      loading={loading}
      pagination={{ 
        current : page,
        pageSize : limit,
        total,
        showTotal: (jumlah) =>`Total ${jumlah} tenant`,
       }}
       onChange={handleChange}
      locale={{ emptyText: 'Tidak ada tenant' }}
    />
  );
}

export default TenantTable;