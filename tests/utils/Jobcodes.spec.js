import { Map, fromJS, OrderedMap } from 'immutable'
import { isParent } from 'redux/utils/JobcodeUtils'

function initialJobcodeList () {
  return OrderedMap({
    '000': Map({
      id: '000',
      parent_id: '0',
      name: 'Jobcode 0'
    }),
    '001': Map({
      id: '001',
      parent_id: '0',
      name: 'Jobcode 1'
    }),
    '002': Map({
      id: '002',
      parent_id: '0',
      name: 'Jobcode 2'
    }),
    '003': Map({
      id: '003',
      parent_id: '002',
      name: 'Jobcode 3'
    }),
    '004': Map({
      id: '004',
      parent_id: '002',
      name: 'Jobcode 4'
    }),
    '005': Map({
      id: '005',
      parent_id: '004',
      name: 'Jobcode 5'
    })  
  })
}

describe('jobcodes', function () {
  it('should determine if selected on same level', function () {
    const initialJobcodesList = initialJobcodeList();
    const parent = initialJobcodesList.get('000')
    const child = initialJobcodesList.get('001')
    expect(isParent(parent, child, initialJobcodesList)).to.be.false

    const parent2 = initialJobcodesList.get('000')
    const child2 = initialJobcodesList.get('000')
    expect(isParent(parent2, child2, initialJobcodesList)).to.be.true
  })
  it('should determine if selected on one different level', function () {
    const initialJobcodesList = initialJobcodeList();
    const parent = initialJobcodesList.get('002')
    const child = initialJobcodesList.get('003')
    expect(isParent(parent, child, initialJobcodesList)).to.be.true

    const parent2 = initialJobcodesList.get('000')
    const child2 = initialJobcodesList.get('003')
    expect(isParent(parent2, child2, initialJobcodesList)).to.be.false
  })
  it('should determine if selected on two different levels', function () {
    const initialJobcodesList = initialJobcodeList();
    const parent = initialJobcodesList.get('002')
    const child = initialJobcodesList.get('005')
    expect(isParent(parent, child, initialJobcodesList)).to.be.true

    const parent2 = initialJobcodesList.get('000')
    const child2 = initialJobcodesList.get('005')
    expect(isParent(parent2, child2, initialJobcodesList)).to.be.false
  })
})