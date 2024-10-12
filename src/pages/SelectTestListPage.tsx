import { DeleteOutlined } from '@ant-design/icons'
import { Avatar, Button, Layout, List, Space, Typography } from 'antd'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import useManageTests from '../hooks/useManageTests'
import { getHomeRoute, getRunRoute } from '../routes/routeConstants'
import { LocalStorageMenuListItem } from '../types'

const ListItem = ({ item }: { item: LocalStorageMenuListItem }) => {
  const navigate = useNavigate()
  const { removeTest } = useManageTests()

  const onClickDelete = (e: React.MouseEvent) => {
    e.stopPropagation()

    if (item?.id) {
      removeTest(item.id)
    }
  }

  return (
    <List.Item
      onClick={() => navigate(getRunRoute(), { state: item.test })}
      className="select-test-list-item"
      // extra={
      //   <Space>
      //     {item?.id && <Button icon={<DeleteOutlined />} onClick={onClickDelete} />}
      //   </Space>
      // }
    >
      <List.Item.Meta
        avatar={
          <Avatar
            shape="square"
            size="large"
            style={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
          >
            {item?.icon || item?.title[0] || ''}
          </Avatar>
        }
        title={
          <span className="select-test-list-item-title">{item.title}</span>
        }
        description={`Кількість питань: ${item.count}`}
      />
    </List.Item>
  )
}

const SelectTestListPage = () => {
  const { tests } = useManageTests()
  const navigate = useNavigate()
  return (
    <div>
      <Button
        icon={<IoMdArrowRoundBack />}
        onClick={() => navigate(getHomeRoute())}
      >
        Назад
      </Button>
      <Typography.Title level={2} style={{ textAlign: 'center' }}>
        Виберіть тест
      </Typography.Title>
      <Layout.Content
        style={{ minHeight: 280, maxHeight: '50vh', overflow: 'auto' }}
      >
        <List
          itemLayout="horizontal"
          dataSource={tests}
          renderItem={(item) => <ListItem item={item} />}
        />
      </Layout.Content>
    </div>
  )
}

export default SelectTestListPage
