import { useEffect } from 'react';
import { Form, Input, Modal, Select } from 'antd';
import { KATEGORI } from '../utils';

function TenantModal({ open, mode, tenant, busy, onSubmit, onDelete, onCancel }) {
  const [form] = Form.useForm();
  useEffect(() => {
    if (!open) return;
    if (mode === 'ubah') {
      form.setFieldsValue({ nama: tenant.nama, kategori: tenant.kategori });
    }
    if (mode === 'tambah') {
      form.resetFields();
    }
  }, [open, mode, tenant, form]);

  let title = 'Tambah Tenant';
  let okText = 'Tambah';
  if (mode === 'ubah') {
    title = `Ubah Tenant: ${tenant?.nama}`;
    okText = 'Simpan';
  }
  if (mode === 'hapus') {
    title = 'Hapus Tenant';
    okText = 'Hapus';
  }

  const handleOk = () => {
    if (mode === 'hapus') {
      onDelete();
    } else {
      form.submit();
    }
  };

  const handleFinish = (values) => {
    if (busy) return; 
    onSubmit(values);
  };

  const handleCancel = () => {
    if (!busy) onCancel();
  };

  return (
    <Modal
      title={title}
      open={open}
      okText={okText}
      cancelText="Batal"
      okButtonProps={{ danger: mode === 'hapus' }}
      confirmLoading={busy}
      cancelButtonProps={{ disabled: busy }}
      onOk={handleOk}
      onCancel={handleCancel}
      forceRender
    >
      {mode === 'hapus' ? (
        <p>
          Yakin ingin menghapus tenant <b>{tenant?.nama}</b>?
          {tenant?.unit && ` Unit ${tenant.unit.nomor} akan otomatis kosong.`}
        </p>
      ) : (
        <Form
          form={form}
          layout="vertical"
          initialValues={{ kategori: KATEGORI[0] }}
          onFinish={handleFinish}
        >
          <Form.Item
            label="Nama"
            name="nama"
            rules={[{ required: true, message: 'Nama wajib diisi' }]}
          >
            <Input placeholder="Nama tenant" />
          </Form.Item>

          <Form.Item label="Kategori" name="kategori">
            <Select options={KATEGORI.map((k) => ({ value: k, label: k }))} />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
}

export default TenantModal;