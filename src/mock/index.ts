import { MockDataType, TestListItem } from '../types'
import art from './art.json'
import biology from './biology.json'
import ecology from './ecology.json'
import geography from './geography.json'
import history from './history.json'
import it from './information_technology.json'
import space from './space.json'

export default [
  {
    title: 'Мистецтво',
    tests: art,
    icon: '🎨',
  },
  {
    title: 'Біологія',
    tests: biology,
    icon: '🦠',
  },
  {
    title: 'Екологія',
    tests: ecology,
    icon: '🌳',
  },
  {
    title: 'Географія',
    tests: geography,
    icon: '🌍',
  },
  {
    title: 'Історія',
    tests: history,
    icon: '📜',
  },
  {
    title: 'Інформаційні технології',
    tests: it,
    icon: '💻',
  },
  {
    title: 'Космос',
    tests: space,
    icon: '🚀',
  },
].map((t) => ({ ...t, count: t.tests.length })) as MockDataType[]
