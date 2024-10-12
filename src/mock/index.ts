import { MockDataType } from '../types'
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
    test: art,
    icon: '🎨',
  },
  {
    title: 'Біологія',
    test: biology,
    icon: '🦠',
  },
  {
    title: 'Екологія',
    test: ecology,
    icon: '🌳',
  },
  {
    title: 'Географія',
    test: geography,
    icon: '🌍',
  },
  {
    title: 'Історія',
    test: history,
    icon: '📜',
  },
  {
    title: 'Інформаційні технології',
    test: it,
    icon: '💻',
  },
  {
    title: 'Космос',
    test: space,
    icon: '🚀',
  },
].map((t) => ({ ...t, count: t.test.length })) as MockDataType[]
