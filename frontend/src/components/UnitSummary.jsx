import { Card, Space, Statistic } from 'antd';

function UnitSummary({ units }) {
  const terisi = units.filter((u) => u.tenant).length;
  const kosong = units.length - terisi;

  return (
    <Card>
      <Space size="large">
        <Statistic title="Unit terisi" value={terisi} />
        <Statistic title="Unit kosong" value={kosong} />
      </Space>
    </Card>
  );
}

export default UnitSummary;