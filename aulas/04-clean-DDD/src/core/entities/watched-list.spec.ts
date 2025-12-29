import { WatchedList } from './watched-list'

class NumberWatchedList extends WatchedList<number> {
  compareItems(a: number, b: number): boolean {
    return a === b
  }
}

describe('WatchedList', () => {
  it('deve ser possível criar uma lista observada com itens iniciais', () => {
    const list = new NumberWatchedList([1, 2, 3])
    expect(list.currentItems).toEqual([1, 2, 3])
  })

  it('deve ser possível adicionar novos itens à lista', () => {
    const list = new NumberWatchedList([1, 2, 3])
    list.add(4)
    expect(list.currentItems).toHaveLength(4)
    expect(list.getNewItems()).toEqual([4])
  })

  it('deve ser possível remover itens da lista', () => {
    const list = new NumberWatchedList([1, 2, 3])
    list.remove(2)
    expect(list.currentItems).toHaveLength(2)
    expect(list.getRemovedItems()).toEqual([2])
  })

  it('deve ser possível adicionar um item mesmo que ele tenha sido removido anteriormente', () => {
    const list = new NumberWatchedList([1, 2, 3])
    list.remove(2)
    list.add(2)
    expect(list.currentItems).toHaveLength(3)
    expect(list.getRemovedItems()).toHaveLength(0)
    expect(list.getNewItems()).toHaveLength(0)
  })

  it('deve ser possível remover um item que foi adicionado recentemente', () => {
    const list = new NumberWatchedList([1, 2, 3])
    list.add(4)
    list.remove(4)
    expect(list.currentItems).toHaveLength(3)
    expect(list.getNewItems()).toHaveLength(0)
    expect(list.getRemovedItems()).toHaveLength(0)
  })

  it('deve ser possível atualizar a lista observada com novos itens', () => {
    const list = new NumberWatchedList([1, 2, 3])
    list.update([2, 3, 4, 5])
    expect(list.getRemovedItems()).toEqual([1])
    expect(list.getNewItems()).toEqual([4, 5])
  })
})
