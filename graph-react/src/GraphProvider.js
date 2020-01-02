var graph = require('@microsoft/microsoft-graph-client');

// Провайдер для работы с Microsoft Graph
export class GraphProvider {
    constructor(accessToken) {
        // Инициализация клиента для работы с Microsoft Graph
        this.client = graph.Client.init({
            authProvider: (done) => {
                done(null, accessToken.accessToken);
            }
        });
    }

    // Получение информации о корневом сайте SharePoint
    getRootSite = async function() {
        return await this.client
            .api("/sites/root")
            .get();
    }

    // Получение информации об авторизованном пользователе
    getUser = async function() {
        return await this.client
            .api('/me')
            .get();
    }
}