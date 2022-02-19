import axios, { AxiosResponse, Method, ResponseType } from 'axios';

type RequestInput = {
	verb?: Method;
	uri: string;
	data?: any;
	params?: { [key: string]: any };
	headers?: { [key: string]: any };
	responseType?: ResponseType;
	baseUrl?: string;
};

export const dataService = <ResponseType>(inputs: RequestInput) => {
	const source = axios.CancelToken.source();
	const req = {
		baseURL: inputs.baseUrl || '/api/v1',
		method: inputs.verb || 'get',
		params: inputs.params,
		url: inputs.uri,
		data: inputs.data,
		responseType: inputs.responseType || 'json',
		cancelToken: source.token,
	};

	const promise = axios(req).then((response: AxiosResponse<ResponseType>) => response.data);

	// @ts-ignore
	promise.cancel = () => {
		source.cancel();
	};

	return promise;
};
