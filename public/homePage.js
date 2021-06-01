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
setInterval(() => {
    fill();
}, 60000); 

const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = (data) => {
        ApiConnector.addMoney(data, response => {
        if(response.success) {
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage(response.success, "Действие прошло успешно" || console.error())
    };
    
    
    });
    
};
moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, response => {
        if(response.success) {
            ProfileWidget.showProfile(response.data);
            
        };
        try {
            moneyManager.setMessage(response.success, moneyManager.errorMessageBlock || "Действие прошло успешно");
        } catch (err) {
            moneyManager.setMessage(err, moneyManager.errorMessageBlock)
        };
    })
};
moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, response => {
        if(response.success) {
            ProfileWidget.showProfile(response.data);
        };
        try {
            moneyManager.setMessage(response.success, err.message ||"Действие прошло успешно");
        } catch (err) {
            moneyManager.setMessage(err, err.message)
        };
    })
};
const favWidget = new FavoritesWidget();
ApiConnector.getFavorites ( response => {
    if(response.success) {
        
        favWidget.clearTable();
        favWidget.fillTable(favWidget.favoritesTableBody);
        moneyManager.updateUsersList(favWidget.favoritesTableBody);
    };
    
});
favWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites (data, response => {
        if(response.success) {
            favWidget.clearTable();
            favWidget.favoritesTableBody.push(favWidget.getData(favWidget.addUserToFavoritesForm ));
            favWidget.fillTable(favWidget.favoritesTableBody);
            moneyManager.updateUsersList(favWidget.favoritesTableBody);
        };
        try {
            favWidget.setMessage(response.success, "Действие прошло успешно");
        } catch (err) {
            console.log(err.message)
        };
});
favWidget.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites (data, response => {
        if(response.success) {
            favWidget.clearTable();
            favWidget.fillTable(favWidget.favoritesTableBody);
            moneyManager.updateUsersList(favWidget.favoritesTableBody);
        };
        favWidget.setMessage(response.success, "Действие прошло успешно");
    })
}};
