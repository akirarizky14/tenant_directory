import { Input, Select, Space } from 'antd';
import { KATEGORI, namaLantai } from '../utils';

function TenantFilter({ filter, daftarLantai, onChange }) {
  return (
    <Space wrap>
      <Input
        placeholder="Cari nama..."
        allowClear
        value={filter.q}
        onChange={(e) => onChange('q', e.target.value)}
        style={{ width: 220 }}
      />

      <Select
        placeholder="Semua kategori"
        allowClear
        value={filter.kategori}
        onChange={(value) => onChange('kategori', value)}
        options={KATEGORI.map((k) => ({ value: k, label: k }))}
        style={{ width: 170 }}
      />

      <Select
        placeholder="Semua lantai"
        allowClear
        value={filter.lantai}
        onChange={(value) => onChange('lantai', value)}
        options={daftarLantai.map((l) => ({ value: l, label: namaLantai(l) }))}
        style={{ width: 170 }}
      />
    </Space>
  );
}

export default TenantFilter;