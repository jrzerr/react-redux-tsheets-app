import { Map, fromJS } from 'immutable'
import { setParent getInitialJobcodes } from 'redux/utils/JobcodeUtils'

describe('jobcodes', function () {
 it('should set parent ids', function () {
  const initialJobcodes = getInitialJobcodes();
  expect(initialJobcodes.getIn(['parent_ids', 'timecard'])).to.equal('0');
  
  
 })
})