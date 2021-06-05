const exit = new LogoutButton();
exit.action = () => {
    ApiConnector.logout(response => {
        if(response.success) {
            location.reload();
            };
        }
    );
};
ApiConnector.current(response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data)
    };
});  
const ratesBoard = new RatesBoard();
const fill = () => ApiConnector.getStocks (response => {
    if(response.success) {
        ratesBoard.clearTable();
        ratesBoard.fillTable(response.data);
    };
});
fill();
setInterval(fill, 60000); 

const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = (data) => {
        ApiConnector.addMoney(data, response => {
            if(response.success) {
                ProfileWidget.showProfile(response.data);
            };
        moneyManager.setMessage(response.success, response.error ||"Пополнение кошелька прошло успешно")
    });
    
};
moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, response => {
        if(response.success) {
            ProfileWidget.showProfile(response.data);
        };
        console.log(data, response);
        moneyManager.setMessage(response.success, response.error ||"Конвертация прошла успешно");
        
    })
};
moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, response => {
        if(response.success) {
            ProfileWidget.showProfile(response.data);
        };

        moneyManager.setMessage(response.success, response.error ||"Перевод денег прошел успешно");
        
    })
};
const favWidget = new FavoritesWidget();
ApiConnector.getFavorites ( response => {
    if(response.success) {
        favWidget.clearTable();
        favWidget.getData(favWidget.fillTable(response.data));
        moneyManager.updateUsersList(response.data);
    };
    
});
favWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites (data, response => {
        if(response.success) {
            favWidget.clearTable();
            favWidget.getData(favWidget.fillTable(response.data));
            moneyManager.updateUsersList(response.data);
        };
        favWidget.setMessage(response.success, response.error ||"Добавление пользователя в избранное прошло успешно");
       
});
favWidget.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites (data, response => {
        if(response.success) {
            favWidget.clearTable();
            favWidget.getData(favWidget.fillTable(response.data));
            moneyManager.updateUsersList(response.data)
        };
        favWidget.setMessage(response.success, response.error ||"Удаление пользователя из избранного прошло успешно");
    })
}};
