var BtczValue = 0;

var startDate = new Date("2018-04-21T21:00:00Z");

var BtczBalance1 = 0;

var BtczBalance2 = 0;


function updatePage(){
    var currentDate = new Date().getTime();
    var hours = Number(Math.round((currentDate-startDate)/3600000));
    var totalDonations = Number(Math.round(BtczBalance1+BtczBalance2));
    var hourlyAverage = Number(Math.round(totalDonations/hours));


    document.getElementById('statsTxt').innerHTML = "<b>" + totalDonations + " BTCZ</b> raised in <b>" + hours + " hours</b>, average: <b>" + hourlyAverage + " BTCZ/h</b>";

	
	var BtczBalance1_toBtc = (BtczBalance1*BtczValue);
	document.getElementById('btczBalance1').innerHTML = BtczBalance1.toFixed(0) + " BTCZ";
	document.getElementById('btczBalance1_toBtc').innerHTML = "<b>" + BtczBalance1_toBtc.toFixed(6) + " BTC</b>";
	
	document.getElementById('btcBalance1').innerHTML = BtcBalance1.toFixed(6) + " BTC";
    document.getElementById('btcBalance1_toBtc').innerHTML = "<b>" + BtcBalance1.toFixed(6) + " BTC</b>";


	var TotalBalance1 = BtczBalance1_toBtc + BtcBalance1 + LtcBalance1_toBtc + EthBalance1_toBtc + ZecBalance1_toBtc;
	document.getElementById('totalBalance1').innerHTML = "<b>" + TotalBalance1.toFixed(6) + " BTC</b>";
	
	document.getElementById('progressBar1').style.width = (TotalBalance1/0.25).toFixed(2) + "%";
    document.getElementById('progressPercent1').innerHTML = (TotalBalance1/0.25).toFixed(1) + "%";
	
	
		
    var BtczBalance2_toBtc = (BtczBalance2*BtczValue);
    document.getElementById('btczBalance2').innerHTML = BtczBalance2.toFixed(0) + " BTCZ";
    document.getElementById('btczBalance2_toBtc').innerHTML = "<b>" + BtczBalance2_toBtc.toFixed(6) + " BTC</b>";
	
	
	var TotalBalance2 = BtczBalance2_toBtc + BtcBalance2 + LtcBalance2_toBtc + EthBalance2_toBtc + ZecBalance2_toBtc;	
	document.getElementById('totalBalance2').innerHTML = "<b>" + TotalBalance2.toFixed(6) + " BTC</b>";
	
	document.getElementById('progressBar2').style.width = (TotalBalance2/0.025).toFixed(2) + "%";
    document.getElementById('progressPercent2').innerHTML = (TotalBalance2/0.025).toFixed(1) + "%";

}

function getBalances(){
    var xhr1 = new XMLHttpRequest();
    xhr1.open("GET", "https://bitcoinz.ph/api/addr/t1XssfrUdyVyTFmrtujLG4ovFsWqVt8XZgf/balance", true);
    xhr1.onload = function(){
        if(this.status == 200){
            var result = xhr1.responseText;
            BtczBalance1 = Number(result/100000000);
            updatePage();
        }
    }
    xhr1.send();
    var xhr3 = new XMLHttpRequest();
    xhr3.open("GET", "https://api.coinmarketcap.com/v1/ticker/bitcoinz/", true);
    xhr3.onload = function(){
        if(this.status == 200){
            var result = JSON.parse(xhr3.responseText);
            BtczValue = Number(result[0].price_btc);
            updatePage();
        }
     xhr3.send();
    }	
}

function start(){
    getBalances();
    setInterval(function(){getBalances();}, 300000);
}
