import { useEffect, useState } from 'react';
import { Button, Card, Space, Typography, message } from 'antd';
import { request } from '../api/api';
import UnitSummary from './components/UnitSummary';
import TenantModal from './components/TenantModal';
import TenantFilter from './components/TenantFilter';
import TenantTable from './components/TenantTable';

function App() {
  const [messageApi, contextHolder] = message.useMessage();
  const [tenants, setTenants] = useState([]);
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [filter, setFilter] = useState({ q: '', kategori: undefined, lantai: undefined });
  const [page, setPage] = useState(
    () => Number(new URLSearchParams(window.location.search).get('page')) || 1
  );
  const [total,setTotal] = useState(0);
  const [modal, setModal] = useState({ open: false, mode: 'tambah', tenant: null });
  const [sort, setSort] = useState({field: 'nama', order: 'asc'});

  const limit = 5;
  const getTenants = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filter.q) params.append('q', filter.q);
      if (filter.kategori) params.append('kategori', filter.kategori);
      if (filter.lantai) params.append('lantai', filter.lantai);

      params.append('page',page);
      params.append('limit',limit);
      params.append('sort',sort.field);
      params.append('order',sort.order);

      const res = await request(`/tenants?${params}`);
      if (res.data.length === 0 && page > 1){
        setPage(Math.max(res.totalPages, 1));
        return;
      }
      setTenants(res.data);
      setTotal(res.total)
    } catch (err) {
      messageApi.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getUnits = async () => {
    try {
      const data = await request('/units');
      setUnits(data);
    } catch (err) {
      messageApi.error(err.message);
    }
  };

  useEffect(() => {
    getUnits();
  }, []);

  useEffect(() => {
    getTenants();
  }, [filter,page,sort]);

  useEffect(() => {
    const url = new URL(window.location);
    url.searchParams.set('page', page);
    window.history.replaceState(null, '', url);
  }, [page]);

  const kirim = async (path, method, body, pesanSukses) => {
    setBusy(true);
    try {
      await request(path, {
        method,
        body: body ? JSON.stringify(body) : undefined,
      });
      messageApi.success(pesanSukses);
      await getTenants();
      await getUnits();
      return true;
    } catch (err) {
      messageApi.error(err.message);
      return false;
    } finally {
      setBusy(false);
    }
  };

  const handleFilterChange = (name, value) => {
    setFilter({ ...filter, [name]: value });
    setPage(1);
  };

  const handlePageChange = (newPage) =>{
    setPage(newPage);
  }
  const handleSortChange = (field, order) => {
    if (!order) {
      setSort({ field: 'nama', order: 'asc' });
    } else {
      setSort({ field, order: order === 'ascend' ? 'asc' : 'desc' });
    }
    setPage(1);
  };
  const openModal = (mode, tenant = null) => {
    setModal({ open: true, mode, tenant });
  };

  const closeModal = () => {
    setModal({ ...modal, open: false });
  };

  const handleSubmit = async (values) => {
    let berhasil;
    if (modal.mode === 'ubah') {
      berhasil = await kirim(`/tenants/${modal.tenant.tenant_id}`, 'PUT', values, 'Tenant berhasil diubah');
    } else {
      berhasil = await kirim('/tenants', 'POST', values, 'Tenant berhasil ditambahkan');
    }
    if (berhasil) closeModal();
  };

  const handleDelete = async () => {
    const tenant = modal.tenant;
    const berhasil = await kirim(
      `/tenants/${tenant.tenant_id}`,
      'DELETE',
      null,
      `Tenant ${tenant.nama} dihapus`
    );
    if (berhasil) closeModal();
  };

  const handleAssign = (tenant, unit_id) => {
    const pesan = unit_id ? 'Unit berhasil ditempatkan' : 'Unit berhasil dilepas';
    kirim(`/tenants/${tenant.tenant_id}/unit`, 'PUT', { unit_id }, pesan);
  };

  const daftarLantai = [...new Set(units.map((u) => u.lantai))];

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: 24 }}>
      {contextHolder}

      <Typography.Title level={2}>Tenant Directory</Typography.Title>

      <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
        <UnitSummary units={units} />

        <Card
          title="Daftar Tenant"
          extra={
            <Space>
              <TenantFilter
                filter={filter}
                daftarLantai={daftarLantai}
                onChange={handleFilterChange}
              />
              <Button type="primary" onClick={() => openModal('tambah')} disabled={busy}>
                Tambah Tenant
              </Button>
            </Space>
          }
        >
          <TenantTable
            tenants={tenants}
            units={units}
            page={page}
            limit={limit}
            total={total}
            onPageChange={handlePageChange}
            loading={loading}
            busy={busy}
            sort={sort}
            onSortChange={handleSortChange}
            onEdit={(tenant) => openModal('ubah', tenant)}
            onDelete={(tenant) => openModal('hapus', tenant)}
            onAssign={handleAssign}
          />
        </Card>
      </Space>

      <TenantModal
        open={modal.open}
        mode={modal.mode}
        tenant={modal.tenant}
        busy={busy}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
        onCancel={closeModal}
      />
    </div>
  );
}

export default App;