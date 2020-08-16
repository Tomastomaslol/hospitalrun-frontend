import { mount } from 'enzyme'
import React from 'react'
import { act } from 'react-dom/test-utils'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import SearchPatients from '../../../patients/search/SearchPatients'
import ViewPatients from '../../../patients/search/ViewPatients'
import PatientRepository from '../../../shared/db/PatientRepository'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('Patients', () => {
  const setup = async () => {
    const store = mockStore({})
    let wrapper: any

    await act(async () => {
      wrapper = await mount(
        <Provider store={store}>
          <MemoryRouter>
            <ViewPatients />
          </MemoryRouter>
        </Provider>,
      )
    })
    return wrapper
  }

  beforeEach(() => {
    jest.resetAllMocks()
    jest.spyOn(PatientRepository, 'search').mockResolvedValue([])
    jest.spyOn(PatientRepository, 'count').mockResolvedValueOnce(0)
  })

  it('should render the search patients component', async () => {
    const wrapper = await setup()

    expect(wrapper.exists(SearchPatients)).toBeTruthy()
  })
})
