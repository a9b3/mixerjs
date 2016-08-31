import React, { Component } from 'react'
import expect from 'expect'
import sinon from 'sinon'
import { shallow, mount } from 'enzyme'

function nextTick(fn) {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        await fn()
        resolve()
      } catch (e) {
        reject(e)
      }
    }, 1)
  })
}

describe('write tests', () => {
  const foohelper = {
    fooAsync() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve('foo')
        }, 1000)
      })
    },
  }
  class Foo extends Component {
    state = {}

    async componentDidMount() {
      const res = await foohelper.fooAsync()
      this.setState({ res })
    }

    bar = (a) => {
      this.setState({
        a,
      })
    }

    render() {
      return <div id='one'>
        <div id='two'>
        </div>
        {
          this.state.res && <div id='res'>
            {this.state.res}
          </div>
        }
      </div>
    }
  }

  it('render dom without a problems', async () => {
    const root = shallow(<div />)
    expect(root.find('div').length).toBe(1)
  })

  it('test components with enzyme', async () => {
    const wrapper = mount(<Foo />)
    expect(wrapper.find('#one').length).toBe(1)
    expect(wrapper.find('#two').length).toBe(1)
  })

  it('stub out async functions', async () => {
    const fooAsyncStub = sinon.stub(foohelper, 'fooAsync').returns(Promise.resolve('hi'))
    const wrapper = mount(<Foo />)

    await nextTick(() => {
      sinon.assert.calledOnce(fooAsyncStub)
      expect(wrapper.state().res).toBe('hi')
    })
  })

  it('call component functions', async () => {
    const wrapper = mount(<Foo />)
    wrapper.instance().bar('foo')

    expect(wrapper.state().a).toBe('foo')
  })
})
