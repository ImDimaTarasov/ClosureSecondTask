const makeRequestUsingURL = () => {
	const request = async (url) => {
		try {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(
					`Could not fetch ${url}, status: ${response.status}`
				);
			}
			const data = await response.json();
			return data;
		} catch (error) {
			throw error;
		}
	};
	return request;
};

// const people = [
// 	{ name: "Alice", age: 21 },
// 	{ name: "Max", age: 20 },
// 	{ name: "Jane", age: 20 },
// ];

// const groupBy = (objectArray, property) => {
// 	return group = objectArray.reduce((result, person) => {
//         if(!result[person.age]) {
//             result[person.age]= [];
//         }
//         result[person.age].push(person)
//         return result
//     }, {});
// };
// console.log(groupBy(people, "age"));
