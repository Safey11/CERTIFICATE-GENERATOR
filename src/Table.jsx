import React, { useContext, useMemo } from 'react';
import { HolderOutlined } from '@ant-design/icons';
import { DndContext } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button, Table } from 'antd';

const RowContext = React.createContext({});

const DragHandle = () => {
  const { setActivatorNodeRef, listeners } = useContext(RowContext);
  return (
    <Button
      type="text"
      size="small"
      icon={<HolderOutlined />}
      style={{
        cursor: 'move',
      }}
      ref={setActivatorNodeRef}
      {...listeners}
    />
  );
};

const columns = [
  {
    key: 'sort',
    align: 'center',
    width: 80,
    render: () => <DragHandle />,
  },
  {
    title: 'STUDENT ID',
    dataIndex: 'student_id',
  },
  {
    title: 'NAME',
    dataIndex: 'name',
  },
  {
    title: 'COURSE',
    dataIndex: 'course',
  },
  {
    title: 'BATCH',
    dataIndex: 'batch',
  },
  {
    title: 'STATUS',
    dataIndex: 'status',
  },
  {
    title: 'CERTIFICATE',
    dataIndex: 'certificate',
    render: () => <Button type="primary">Generate Certificate</Button>, 
  },
];

const initialData = [
  {
    key: '1',
    student_id: '12344',
    name: 'SAIF MUHAMMAD',
    course: 32,
    batch: 'Batch 10',
    status: 'completed',
  },
  {
    key: '2',
    student_id: '21234',
    name: 'Jim Green',
    course: 42,
    batch: 'Batch 11',
    status: 'completed',
  },
  {
    key: '3',
    student_id: '32133',
    name: 'Joe Black',
    course: "WEB & APP",
    batch: 'Batch 10',
    status: 'in progress',
  },
  {
    key: '3',
    student_id: '32133',
    name: 'Joe Black',
    course: "WEB & APP" ,
    batch: 'Batch 8',
    status: 'in progress',
  },
  {
    key: '3',
    student_id: '32133',
    name: 'Joe Black',
    course: "Graphics designing",
    batch: 'Batch 10',
    status: 'completed',
  },
  {
    key: '3',
    student_id: '32133',
    name: 'Joe Black',
    course: "Flutte",
    batch: 'Batch 9',
    status: 'in progress',
  },
];

const Row = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props['data-row-key'],
  });

  const style = {
    ...props.style,
    transform: CSS.Translate.toString(transform),
    transition,
    ...(isDragging
      ? {
          position: 'relative',
          zIndex: 9999,
        }
      : {}),
  };

  const contextValue = useMemo(
    () => ({
      setActivatorNodeRef,
      listeners,
    }),
    [setActivatorNodeRef, listeners],
  );

  return (
    <RowContext.Provider value={contextValue}>
      <tr {...props} ref={setNodeRef} style={style} {...attributes} />
    </RowContext.Provider>
  );
};

const TableApp = () => {
  const [dataSource, setDataSource] = React.useState(initialData);

  const onDragEnd = ({ active, over }) => {
    if (active.id !== over?.id) {
      setDataSource((prevState) => {
        const activeIndex = prevState.findIndex((record) => record.key === active?.id);
        const overIndex = prevState.findIndex((record) => record.key === over?.id);
        return arrayMove(prevState, activeIndex, overIndex);
      });
    }
  };

  return (
    <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
      <SortableContext items={dataSource.map((i) => i.key)} strategy={verticalListSortingStrategy}>
        <Table
          rowKey="key"
          components={{
            body: {
              row: Row,
            },
          }}
          columns={columns}
          dataSource={dataSource}
        />
      </SortableContext>
    </DndContext>
  );
};

export default TableApp;
