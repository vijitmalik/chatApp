const makeApiCall = async (url, method = "GET", body = null) => {
    try {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        if (body) {
            options.body = JSON.stringify(body);
        }
        let apiUrl = `http://127.0.0.1:8000/api/${url}`
        const response = await fetch(apiUrl, options);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {

            const data = await response.json();
        return data;

            }
    } catch (error) {
        console.error('API call error:', error);
        throw error;
    }
};

export { makeApiCall };
