function reverString(str) {
	var arr = str.split('')
	arr.reverse()
	return arr.join('')
}


// N 个数组，求交集
function getCommonArr(arr) {
	// 思路：每次取两个数组做比较，取交集；然后用交集数组跟剩余的数组再取交集，直到遍历结束
	let tmp
	for(let i = 0; i < arr.length - 1; i++) {

		tmp = compare(arr[i], arr[i + 1])

		// 如果任意一次取交集为 []，则交集为 []
		if(tmp.length === 0) break;


	}
	return tmp
	
}

// 数组非零非负最小值的index [10,21,0,-7,35,7,9,23,18] 

function getCorrectNumIndex(arr) {
	let idx = -1 // 代表找不到
	let tmp = arr[0]
	for(let i = 1; i < arr.length; i++) {
		if(arr[i] > 0 && tmp > arr[i]) {
			tmp = arr[i]
			idx = i
		} 
	}
	return idx
}

function mockSplice(idx, count, str) {

}

String.prototype.mockSplice = function(idx, count, str) {
	let s = this
	return s.substring(0, idx) + str + s.substring(count + 1)
}

// 仅执行一次
function once(fn) {
	let excuted = false
	return () => {
		if(excuted) return
		fn()
		excuted = true
	}
}



