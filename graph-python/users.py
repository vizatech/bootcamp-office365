import adal
import requests

# Тенант в Microsoft 365
aad_tenant = "vitalyzhukov.com"
# Идентификатор приложения
client_id = "f9812a25-094b-48c3-b1ec-3006e93c56fd"
# Ключ для авторизации приложения без пользователя
client_secret = "uEeRIqWx2Gmc5R/2bKpmcKs/OdZ]h3O@"
# Ендпоинт
authority = "https://login.microsoftonline.com/{}".format(aad_tenant)

# Контекст авторизации
ctx = adal.AuthenticationContext(authority)

# Запрашиваем токен
token = ctx.acquire_token_with_client_credentials("https://graph.microsoft.com", client_id, client_secret)

# Заголовок для запросов к Microsoft Graph
headers = { 
    # Токен
    "Authorization" : "Bearer {0}".format(token["accessToken"]),
    # Ожидаем получить данные в формате JSON
    "Accept" : "application/json",
    # Передаем данные в формате JSON
    "Content-Type" : "application/json"
}

# Базовый URL для работы с Microsoft Graph v1.0
base_url = "https://graph.microsoft.com/v1.0"

# URL для запроса списка пользователей
users_url = base_url + "/users?$top=50"

# Получаем список пользователей
users_response = requests.get(url = users_url, headers = headers)
users_json = users_response.json()
users_items = users_json["value"]

for user in users_items:
    print("{} - {}".format(user["userPrincipalName"], user["displayName"]))
