import { Select } from 'antd';
import { namaLantai } from '../utils';

function UnitSelect({ tenant, units, busy, onAssign }) {
  const pilihanUnit = units
    .filter((u) => !u.tenant || u.tenant.tenant_id === tenant.tenant_id)
    .map((u) => ({ value: u.unit_id, label: `${u.nomor}, ${namaLantai(u.lantai)}` }));

  const options = [{ value: '', label: '-' }, ...pilihanUnit];

  return (
    <Select
      variant="borderless"
      style={{ width: 200 }}
      value={tenant.unit_id ?? ''}
      disabled={busy}
      options={options}
      optionRender={(option) => (option.value === '' ? '- (Tanpa unit)' : option.label)}
      onChange={(value) => onAssign(tenant, value === '' ? null : value)}
    />
  );
}

export default UnitSelect;