import { update, clockIn, clockOut, getInitialTimesheet } from 'redux/utils/TimesheetUtils'
import { Map, fromJS } from 'immutable'

describe('Timesheet', function() {
  it('should update timesheet', function() {
    const initial_ts = fromJS({
      id: '123abc',
      start: undefined,
      end: undefined,
      notes: ''
    })
    const date = new Date();
    const updated_ts = update(initial_ts, fromJS({
      start: date,
      notes: 'some notes'
    }))

    expect(updated_ts).to.equal(fromJS({
        id: '123abc',
        start: date,
        end: undefined,
        notes: 'some notes'
    }))
  })

  it('should clock in timesheet', function() {
    const initial_ts = fromJS({
      id: '123abc',
      start: undefined,
      end: undefined,
      notes: '',
      on_the_clock: false
    })
    const date = new Date()
    const updated_ts = clockIn(initial_ts, date)
    expect(updated_ts.get('on_the_clock')).to.equal(true);
    expect(updated_ts.get('start').getTime()).to.equal(date.getTime())
  })

  it('should clock out timesheet', function() {
    const initial_ts = fromJS({
      id: '123abc',
      start: new Date(),
      end: undefined,
      notes: '',
      on_the_clock: true
    })
    const date = new Date()
    const updated_ts = clockOut(initial_ts, date)

    expect(updated_ts.get('on_the_clock')).to.equal(false);
    expect(updated_ts.get('end').getTime()).to.equal(date.getTime())
  })

  
})