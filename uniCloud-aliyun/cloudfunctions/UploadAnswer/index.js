'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event.userAnswer)
	let res = await db.collection('userAnswer').add(event.userAnswer);
	
	//返回数据给客户端
	return res;
};
