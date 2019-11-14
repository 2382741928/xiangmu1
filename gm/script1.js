

var deleteGoods = null
var goodsList;

function ajaxGet(url, cb, data) {
	data = data || {};
	var str = "";
	for (var i in data) {
		str += `${i}=${data[i]}&`;
	}
	var d = new Date();
	url = url + "?" + str + "__qft=" + d.getTime();

	var xhr = new XMLHttpRequest();
	xhr.open("get", url, true);
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && xhr.status == 200) {
			cb(xhr.responseText)
		}
	}
	xhr.send();
}
// ajaxGet('http://localhost/zhangjian/gm/goods.json', function (a) {
// 	var res = JSON.parse(a);
// 	var car = JSON.parse(window.localStorage.getItem("shopCar"));
// 	for(let i=0;i<res.length;i++) {
// 		for(var s = 0;s<shopCar.length;s++){
// 			if( shopCar[s].id==res[i].idx){
// 				var liang=shopCar[s].num

// 			}
// 		}
// 	}

	
// })









loadGoods()
function loadGoods() {
q
	ajaxGet("http://localhost/zhangjian/gm/goods.json", function (res) {
				 goodsList = JSON.parse(res);
				 cb(goodsList)
				})
	var carList = JSON.parse(localStorage.getItem("shopCar"));
	function cb(goodsList){
		var str = "";
		for(var i = 0; i < goodsList.length;i++){
			for(var c=0;c<carList.length;c++){
				if(goodsList[i].idx==carList[c].id){
					str += `<div class="goods-item" idx="${goodsList[i].idx}">
						<div class="panel panel-default">
			 			<div class="panel-body">
			 			<div class="col-md-1 car-goods-info">
			 			<label><input type="checkbox" class="goods-list-item"/></label>
			 			</div>
			 			<div class="col-md-3 car-goods-info goods-image-column">
			 			<img class="goods-image" src="${goodsList[i].img}" style="width: 100px; height: 100px;" />
			 		<span id="goods-info"></span>
			 			</div>
			 			<div class="col-md-3 car-goods-info goods-params">${goodsList[i].show}</div>
			 			<div class="col-md-1 car-goods-info goods-price"><span>￥</span><span class="single-price"> ${goodsList[i].jiage} </span></div>
			 			<div class="col-md-1 car-goods-info goods-counts">
			 			<div class="input-group">
			 			<div class="input-group-btn">
			 			<button type="button" class="btn btn-default car-decrease">-</button>
			 			</div>
			 			<input type="text" class="goods-count" value="${carList[c].shu}">
			 			<div class="input-group-btn">
			 			<button type="button" class="btn btn-default car-add">+</button>
			 			</div>
			 			</div>
			 			</div>
			 			<div class="col-md-1 car-goods-info goods-money-count"><span>￥</span><span class="single-total">${goodsList[i].jiage*carList[c].shu}  </span></div>
			 			<div class="col-md-2 car-goods-info goods-operate">
			 			<button type="button" class="btn btn-danger item-delete">删除</button>
			 			</div>
			 			</div>
			 			</div>
					</div>`;
				}
			}
			// str += `<div class="goods-item">
			// 			<div class="panel panel-default">
			//  			<div class="panel-body">
			//  			<div class="col-md-1 car-goods-info">
			//  			<label><input type="checkbox" class="goods-list-item"/></label>
			//  			</div>
			//  			<div class="col-md-3 car-goods-info goods-image-column">
			//  			<img class="goods-image" src="${goodsList[i].img}" style="width: 100px; height: 100px;" />
			//  		<span id="goods-info"></span>
			//  			</div>
			//  			<div class="col-md-3 car-goods-info goods-params">${goodsList[i].show}</div>
			//  			<div class="col-md-1 car-goods-info goods-price"><span>￥</span><span class="single-price"> ${goodsList[i].jiage} </span></div>
			//  			<div class="col-md-1 car-goods-info goods-counts">
			//  			<div class="input-group">
			//  			<div class="input-group-btn">
			//  			<button type="button" class="btn btn-default car-decrease">-</button>
			//  			</div>
			//  			<input type="text" class="goods-count" value="${}">
			//  			<div class="input-group-btn">
			//  			<button type="button" class="btn btn-default car-add">+</button>
			//  			</div>
			//  			</div>
			//  			</div>
			//  			<div class="col-md-1 car-goods-info goods-money-count"><span>￥</span><span class="single-total">${goodsList[i].jiage}  </span></div>
			//  			<div class="col-md-2 car-goods-info goods-operate">
			//  			<button type="button" class="btn btn-danger item-delete">删除</button>
			//  			</div>
			//  			</div>
			//  			</div>
			// 		</div>`;
					// $(".form-control input").eq(i).html(`${goodsList[i].count}`)
					
			}
		$('.goods-content').html(str)
	}
		


function ShoppingCarObserver(elInput, isAdd) {
	this.elInput = elInput
	this.parents = this.elInput.parents('.goods-item')
	this.count = parseInt(this.elInput.val())
	this.isAdd = isAdd
	this.singlePrice = parseFloat(this.parents.find('.single-price').text())
	this.computeGoodsMoney = function() {
		var moneyCount = this.count * this.singlePrice
		var singleTotalEl = this.parents.find('.single-total')
		console.log(moneyCount)
		singleTotalEl.empty().append(moneyCount)
	}
	this.showCount = function() {
		var isChecked = this.parents.find('.goods-list-item')[0].checked
		var GoodsTotalMoney = parseFloat($('#selectGoodsMoney').text())
		var goodsTotalCount = parseInt($('#selectGoodsCount').text())
		if(this.elInput) {
			if(this.isAdd) {
				++this.count
				if(isChecked) {
					$('#selectGoodsMoney').empty().append(GoodsTotalMoney + this.singlePrice)
					$('#selectGoodsCount').empty().append(goodsTotalCount + 1)
				}
			} else {
				if(parseInt(this.count) <= 1) {
					return
				} else {
					--this.count
					if(isChecked) {
						$('#selectGoodsMoney').empty().append(GoodsTotalMoney - this.singlePrice)
						$('#selectGoodsCount').empty().append(goodsTotalCount - 1)
					}
				}
			}
			this.elInput.val(this.count)
		}
	}
	this.checkIsAll = function() {
		var checkLen = $('.goods-list-item:checked').length
		if (checkLen > 0) {
			$('.submitData').removeClass('submitDis')
		} else {
			$('.submitData').addClass('submitDis')
		}
		if($('.goods-item').length === checkLen) {
			$('#checked-all-bottom, #check-goods-all').prop('checked', true)
		} else {
			$('#checked-all-bottom, #check-goods-all').prop('checked', false)
		}
	}
	this.checkedChange = function(isChecked) {
		if(isChecked === undefined) {
			var isChecked = this.parents.find('.goods-list-item')[0].checked
		}
		var itemTotalMoney = parseFloat(this.parents.find('.single-total').text())
		var GoodsTotalMoney = parseFloat($('#selectGoodsMoney').text())
		var itemCount = parseInt(this.parents.find('.goods-count').val())
		var goodsTotalCount = parseInt($('#selectGoodsCount').text())
		if(isChecked) {
			$('#selectGoodsMoney').empty().append(itemTotalMoney + GoodsTotalMoney)
			$('#selectGoodsCount').empty().append(itemCount + goodsTotalCount)
		} else {
			if (GoodsTotalMoney - itemTotalMoney === 0) {
				$('#selectGoodsMoney').empty().append('0.00')
				if (!$('.submitData').hasClass('submitDis')) {
					$('.submitData').addClass('submitDis')
				}
			} else {
				$('#selectGoodsMoney').empty().append(GoodsTotalMoney - itemTotalMoney)
			}
			$('#selectGoodsCount').empty().append(goodsTotalCount - itemCount)
		}
	}
	this.deleteGoods = function() {
		var isChecked = this.parents.find('.goods-list-item')[0].checked
		if(isChecked) {
			this.checkedChange(false)
		}
		this.parents.remove()
		this.checkOptions()
	}
	this.checkOptions = function() {
		if ($('#check-goods-all')[0].checked) {
			if ($('.goods-list-item').length <= 0) {
				$('#checked-all-bottom, #check-goods-all').prop('checked', false)
			}
		}
	}
}
function checkedAll(_this) {
	
	if ($('.goods-item').length <= 0) {
		$('.submitData').addClass('submitDis')
	} else {
		$('.submitData').removeClass('submitDis')
	}
	for(var i = 0; i < $('.goods-item').length; i++) {
		var elInput = $('.goods-item').eq(i).find('.goods-list-item')
		var isChecked = $('.goods-item').eq(i).find('.goods-list-item')[0].checked
		var checkAllEvent = new ShoppingCarObserver(elInput, null)
		if(_this.checked) {
			if(!isChecked) {
				elInput.prop('checked', true)
				checkAllEvent.checkedChange(true)
			}
		} else {
			if (!$('.submitData').hasClass('submitDis')){
				$('.submitData').addClass('submitDis')
			}
			if(isChecked) {
				elInput.prop('checked', false)
				checkAllEvent.checkedChange(false)
			}
		}
	}
}
$('#check-goods-all').on('change', function() {
	if(this.checked) {
		$('#checked-all-bottom').prop('checked', true)
	} else {
		$('#checked-all-bottom').prop('checked', false)
	}
	checkedAll(this)
})
$('#checked-all-bottom').on('change', function() {
	if(this.checked) {
		$('#check-goods-all').prop('checked', true)
	} else {
		$('#check-goods-all').prop('checked', false)
	}
	checkedAll(this)
})
$('.goods-list-item').on('change', function() {
	var tmpCheckEl = $(this)
	var checkEvent = new ShoppingCarObserver(tmpCheckEl, null)
	checkEvent.checkedChange()
	checkEvent.checkIsAll()
})
$('.goods-content').on('click',".goods-list-item",function() {
	var num = 0;
	for(let i = 0; i < $('.goods-list-items').length; i++){
		if($('.goods-list-items')[i].checked){
			num += parseInt($(".single-total")[i].text)
		}
	}
	$("#selectGoodsMoney").text(num);
})
$('.goods-content').on('click', '.car-decrease', function() {
	var goodsInput = $(this).parents('.input-group').find('.goods-count')
	var decreaseCount = new ShoppingCarObserver(goodsInput, false)
	decreaseCount.showCount()
	decreaseCount.computeGoodsMoney()
})
$('.goods-content').on('click', '.car-add', function() {
	var goodsInput = $(this).parents('.input-group').find('.goods-count')
	var addCount = new ShoppingCarObserver(goodsInput, true)
	addCount.showCount()
	addCount.computeGoodsMoney()
})
$('.goods-content').on('click', '.item-delete', function() {
	// var goodsInput = $(this).parents('.goods-item').find('.goods-list-item')
	// deleteGoods = new ShoppingCarObserver(goodsInput, null)
	// $('#deleteItemTip').modal('show')
	
	$(this).parent().parent().remove();
	var idx=$(this).parent().parent().attr("idx");
	// for(var i=0;i<)

})
$('.deleteSure').on('click', function() {
	if(deleteGoods !== null) {
		deleteGoods.deleteGoods()
	}
	$('#deleteItemTip').modal('hide')
})
$('#deleteMulty').on('click', function() {
	if($('.goods-list-item:checked').length <= 0) {
		$('#selectItemTip').modal('show')
	} else {
		$('#deleteMultyTip').modal('show')
	}
})
$('.deleteMultySure').on('click', function() {
	for (var i = 0; i < $('.goods-list-item:checked').length; i++) {
		var multyDelete = new ShoppingCarObserver($('.goods-list-item:checked').eq(i), null)
		multyDelete.deleteGoods()
		i--
	}
	multyDelete.checkOptions()
	$('#deleteMultyTip').modal('hide')
})}