import { mount } from 'enzyme'
import React from 'react'
import { act } from 'react-dom/test-utils'

import PatientSearchInput from '../../../patients/search/PatientSearchInput'
import SearchPatients from '../../../patients/search/SearchPatients'
import ViewPatientsTable from '../../../patients/search/ViewPatientsTable'
import PatientRepository from '../../../shared/db/PatientRepository'

describe('Search Patients', () => {
  const setup = async () => {
    let wrapper: any

    await act(async () => {
      wrapper = await mount(<SearchPatients />)
    })

    return { wrapper }
  }

  beforeEach(() => {
    jest.spyOn(PatientRepository, 'search').mockResolvedValueOnce([])
    jest.spyOn(PatientRepository, 'count').mockResolvedValueOnce(0)
  })

  it('should render a patient search input', async () => {
    const { wrapper } = await setup()

    expect(wrapper.exists(PatientSearchInput)).toBeTruthy()
  })

  it('should render a view patients table', async () => {
    const { wrapper } = await setup()

    expect(wrapper.exists(ViewPatientsTable)).toBeTruthy()
  })

  it('should update view patients table search request when patient search input changes', async () => {
    const expectedSearch = { queryString: 'someQueryString' }
    let wrapper: any

    await act(async () => {
      wrapper = await mount(<SearchPatients />)
      const patientSearch = wrapper.find(PatientSearchInput)
      const onChange = patientSearch.prop('onChange')
      onChange(expectedSearch)
    })

    wrapper.update()

    const patientsTable = wrapper.find(ViewPatientsTable)
    expect(patientsTable.prop('searchRequest')).toEqual(expectedSearch)
  })
})
