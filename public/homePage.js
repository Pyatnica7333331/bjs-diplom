const exit = new LogoutButton;
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
const ratesBoard = new RatesBoard;
const fill = ApiConnector.getStocks (response => {
    if(response.success) {
        ratesBoard.clearTable();
        ratesBoard.fillTable(response.data);
    };
});

setInterval(() => {
    fill;
}, 60000); 

const moneyManager = new MoneyManager;
moneyManager.addMoneyCallback = (data) => {
        ApiConnector.addMoney(data, response => {
        if(response.success) {
        ProfileWidget.showProfile(response.data)
    };
    
    //moneyManager.setMessage(moneyManager.errorMessageBlock))
    });
    
};
moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, response => {
        if(response.success) {
            ProfileWidget.showProfile(response.data)
        }
    })
};
moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, response => {
        if(response.success) {
            ProfileWidget.showProfile(response.data)
        }
    })
};
const favWidget = new FavoritesWidget;
ApiConnector.getFavorites ( response => {
    if(response.success) {
        favWidget.clearTable();
        favWidget.fillTable(favWidget.favoritesTableBody);
        moneyManager.updateUsersList(favWidget.favoritesTableBody);
        //favWidget.setMessage(isSuccess, message);
    };
});
favWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites (data, response => {
        if(response.success) {
            favWidget.clearTable();
            favWidget.fillTable(favWidget.favoritesTableBody);
            moneyManager.updateUsersList(favWidget.favoritesTableBody);
            //favWidget.setMessage(isSuccess, message);
        };
    })
};
favWidget.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites (data, response => {
        if(response.success) {
            favWidget.clearTable();
            favWidget.fillTable(favWidget.favoritesTableBody);
            moneyManager.updateUsersList(favWidget.favoritesTableBody);
            //favWidget.setMessage(isSuccess, message);
        };
    })
};
