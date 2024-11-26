/**
 * AutoComplete
 * @param {string} url next/api endpoint to get options data
 * @param {string} paramName param name of request
 * @param {string} responsePath response data location contain array options
 * @param {string} valuePropName property name of the response used to adjust options item value
 * @param {string} labelPropName property name of the response used to adjust options item label
 * @param {string} postfixLabelPropName property name of the response used to adjust options item label
 * example : <MainAutoComplete url= '/api/property/get-all-property' paramName='property_name' valuePropName='name' labelPropName='name'/>
 */
import { AutoComplete, Input, Spin } from 'antd'
import axios from 'axios'
import { debounce, get } from 'lodash'
import { useCallback, useEffect, useState } from 'react'
function isFunctionInObject(obj, functionName) {
	return typeof obj[functionName] === 'function'
}

const MainAutoComplete = ({
	url = '',
	responsePath = 'data.data',
	valuePropName = 'id',
	labelPropName = 'name',
	postfixLabelPropName = undefined,
	paramName = 'name',
	placeholder,
	onChange,
	defaultValue,
	defaultLabel,
	additionalOpt = () => ({}),
	payloadCallback = () => ({}),
	inputStyle = {},
	isCallSelectOnTheFirstLoad= false,
	isFreeText = false,
	...other
}) => {
	const isPayloadCallbackExist = payloadCallback.toString().length > 37
	const [options, setOptions] = useState([])
	const [fetching, setFetching] = useState(false)
	const [inputValue, setInputValue] = useState('')
	const [additionalValue, setAdditionalValue] = useState('')

	const [selected, setSelected] = useState(other.value ?? '')
	const debounceSearch = useCallback(
		debounce(async (value) => {
			fetchData(value)
		}, 1200),
		[url]
	)

	const debounceOnChange = debounce(async (value) => {
		onChange('')
	}, 1200)

	const onSearch = (value) => {
		setOptions([])
		if (!isFreeText) {
			debounceOnChange()
			setSelected('')
		}
		setFetching(true)
		setInputValue(value)
		debounceSearch(value)
	}

	const onFocus = () => {
		if (!inputValue) {
			setFetching(true)
			fetchData()
		}
	}

	const fetchInTheFirstLoad = async (value) => {
		const res = await fetchData(other.value)
		const opt = (res || []).find((item) => item?.value === value)
		isFunctionInObject(other, 'onSelect') && isCallSelectOnTheFirstLoad && other.onSelect('', opt)
	}
	useEffect(() => {
		if (!!other.value) {
			fetchInTheFirstLoad(other.value)
		}
	}, [])

	// useEffect(() => {
	// 	if(!!other.value){
	// 		fetchData(other.value)
	// 		// console.log('kamu')
	// 	}
	// 	if(!isFreeText){
	// 		setAdditionalValue(other.value)
	// 	}
	// }, [other.value])

	const fetchData = async (value) => {
		return await axios
			.request({
				method: 'GET',
				url: url,
				params: {
					[paramName]: value
				},
				headers: {
					'Cache-Control': 'no-cache'
				}
			})
			.then((res) => {
				const response = get(res, responsePath, []) || []
				const optionsMap = response.map((item, index) => ({
					key: 'ac-' + index,
					label: item[labelPropName] + (!!postfixLabelPropName ? ` (${item[postfixLabelPropName]})` : ''),
					value: item[valuePropName],
					...additionalOpt({ item }),
					...(isPayloadCallbackExist ? { payload: item } : {})
				}))
				setOptions(optionsMap)

				return optionsMap
			})
			.catch((err) => {
				console.error(err)
			})
			.finally(() => {
				setFetching(false)
			})
	}

	const onChangeHandler = (val, opt) => {
		isFunctionInObject(other, 'onSelect') && other.onSelect(val, opt)
		setSelected(val)
		onChange(val, opt)
		if (isPayloadCallbackExist) {
			payloadCallback((options || []).map(({ payload }) => payload).find((item) => item[valuePropName] === val))
		}
	}
	useEffect(() => {
		if (!!defaultValue && !!defaultLabel) {
			setOptions([{ value: defaultValue, label: defaultLabel }])
		}
	}, [])
	return (
		<>
			<AutoComplete
				{...other}
				options={options}
				onSearch={onSearch}
				onFocus={onFocus}
				onChange={isFreeText ? onChangeHandler : () => {}}
				onSelect={!isFreeText ? onChangeHandler : () => {}}
				value={options.find((item) => item.value === selected)?.label || (isFreeText ? other.value : undefined)}
				allowClear
				notFoundContent={fetching ? <Spin size="small" /> : 'No Data Found'}>
				<Input style={inputStyle} placeholder={placeholder} />
			</AutoComplete>
		</>
	)
}
export default MainAutoComplete
