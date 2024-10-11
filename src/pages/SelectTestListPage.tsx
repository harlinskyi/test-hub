import { Avatar, Button, Layout, List, Typography } from 'antd'
import Tests from '../mock'
import { MockDataType } from '../types'
import { useNavigate } from 'react-router-dom'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { getHomeRoute, getRunRoute } from '../routes/routeConstants'

const ListItem = ({ item }: { item: MockDataType }) => {
  const navigate = useNavigate()

  return (
    <List.Item
      onClick={() => navigate(getRunRoute(), { state: item.tests })}
      className="select-test-list-item"
    >
      <List.Item.Meta
        avatar={
          <Avatar
            shape="square"
            size="large"
            style={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
          >
            {item.icon}
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
      <Layout.Content style={{ minHeight: 280 }}>
        <List
          itemLayout="horizontal"
          dataSource={Tests}
          renderItem={(item) => <ListItem item={item} />}
        />
      </Layout.Content>
    </div>
  )
}

export default SelectTestListPage
