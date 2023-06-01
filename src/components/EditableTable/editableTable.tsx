import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Input, Popconfirm, Table, InputNumber, Typography } from "antd";
import style from "./editableTable.module.css";

const url = "http://127.0.0.1:3000";

interface Item {
  ID: string;
  MP10: string;
  MP25: string;
  O3: string;
  CO: string;
  NO2: string;
  SO2: string;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number";
  record: Item;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export function EditableTable() {
  const [form] = Form.useForm();
  const [data, setData] = useState<Item[]>([]);
  const [editingKey, setEditingKey] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/alterar`);
        const fetchedData = response.data;

        if (Array.isArray(fetchedData)) {
          const newData = fetchedData.map((row) => ({
            ID: row.ID,
            MP10: row.MP10,
            MP25: row.MP25,
            O3: row.O3,
            CO: row.CO,
            NO2: row.NO2,
            SO2: row.SO2,
          }));

          setData(newData);
        } else {
          console.log("Fetched data is not an array:", fetchedData);
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const isEditing = (record: Item) => record.ID === editingKey;

  

  const handleDelete = (ID: React.Key) => {
    const newData = data.filter((item) => item.ID !== ID);
    setData(newData);
  };

  const save = async (ID: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;

      const newData = [...data];
      const index = newData.findIndex((item) => ID === item.ID);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey("");

        // Enviar solicitação POST para atualizar os dados no servidor
        const requestBody = {
          id: ID, // ID do registro a ser atualizado
          mp10: row.MP10,
          mp25: row.MP25,
          o3: row.O3,
          co: row.CO,
          no2: row.NO2,
          so2: row.SO2,
        };

        const response = await fetch(`${url}/alterar`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        if (response.ok) {
          console.log("Dados atualizados com sucesso");
        } else {
          console.error("Erro ao atualizar os dados");
        }
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Erro:", errInfo);
    }
  };

  const edit = (record: Partial<Item> & { ID: React.Key }) => {
    form.setFieldsValue({
      MP10: "",
      MP25: "",
      O3: "",
      CO: "",
      NO2: "",
      SO2: "",
      ...record,
    });
    setEditingKey(record.ID);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "ID",
      width: "12.5%",
    },
    { title: "MP10", dataIndex: "MP10", editable: true, width: "12.5%" },
    {
      title: "MP2.5",
      dataIndex: "MP25",
      editable: true,
      width: "12.5%",
    },
    {
      title: "O3",
      dataIndex: "O3",
      editable: true,
      width: "12.5%",
    },
    {
      title: "CO",
      dataIndex: "CO",
      editable: true,
      width: "12.5%",
    },
    {
      title: "NO2",
      dataIndex: "NO2",
      editable: true,
      width: "12.5%",
    },
    {
      title: "SO2",
      dataIndex: "SO2",
      editable: true,
      width: "12.5%",
    },
    {
      title: "Ações",
      dataIndex: "acoes",
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span className="flex gap-[2.3rem]">
            <Typography.Link onClick={() => save(record.ID)}>
              Salvar
            </Typography.Link>
            <Popconfirm
              title="Quer mesmo cancelar?"
              onConfirm={cancel}
              okButtonProps={{ className: "font-sans bg-[#3cc2ef]" }}
              cancelButtonProps={{ className: style.cancel }}
              okText="OK"
              cancelText="Cancelar"
            >
              <a className="font-sans text-[#000000]">Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <div className="flex gap-[2rem]">
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              Alterar
            </Typography.Link>
            <Popconfirm
              title="Quer mesmo excluir?"
              onConfirm={() => handleDelete(record.ID)}
              okButtonProps={{ className: "font-sans bg-[#3cc2ef]" }}
              cancelButtonProps={{ className: style.cancel }}
            >
              <a>Excluir</a>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === "number",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName={style.row}
        pagination={{
          onChange: cancel,
          current: 1,
          pageSize: 20,
        }}
      />
    </Form>
  );
}
