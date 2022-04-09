import requests

private_key = '4d1ece90-711f-4ba7-8808-ba8c388a4e81'
public_key = ""
project_id = "7b218aae-0285-437f-b1d3-a068537398c4"

# ----------------------------------------------------------------
# SECTION 1 - Manage users
# ----------------------------------------------------------------

# Create a new user
def add_user(userName, firstName, lastName):
    r = requests.post(
        # Don't touch this.
        'https://api.chatengine.io/users/',

        data={
            # Username - used to identify, set chat admin (CASE SENSITIVE)
            # This is what will appear on top under the the chat name
            "username": userName, 

            # First and last name
            # This will appear in the user lists on the right (in the chat)
            "first_name": firstName, 
            "last_name": lastName, 

            # User password
            "secret": "123123"},
        headers={"Private-Key": private_key}
    )

    # Optional - To check if the user was created (successful return is 201)
    print(r.status_code)


def new_chat_3():
    r = requests.post(
        # Don't touch this.
        'https://api.chatengine.io/chats/',

        data={
            # People in the chat (usernames), chat title 
            "usernames": ["f1@f.com", "p2@p.com"], 

            # Chat title 
            "title": "new chat v1"
            
            "is_direct_chat": "true"
            },
        headers={'Project-ID': project_id, 'User-Name': 'f@f.com', 'User-Secret': '123123'}
    )

    # Optional - To check if the user was created (successful return is 201)
    #print(r.response.text)



# ----------------------------------------------------------------
# SECTION 2 - Manage chats
# ----------------------------------------------------------------



def new_chat_1():
    # Don't touch this.
    url = "https://api.chatengine.io/chats/"
    
    payload = {
        # People in the chat (usernames), chat title 
        "usernames": ["f1@f.com", "p2@p.com"], 

        # Chat title 
        "title": "new chat v1"},
    headers = {

        # Don't touch this.
        'Project-ID': project_id,

        # Username and password of the chat admin - Can be set to the current doctor
        'User-Name': 'f@f.com',
        'User-Secret': '123123'
    }

    # Send data
    response = requests.request("PUT", url, headers=headers, data=payload)

    # Optional - Only to see if it worked
    print(response.text)


def new_chat_2():
    url = "https://api.chatengine.io/chats/"

    payload = {
        "usernames": ['f@f.com', 'p1@p.com'],
        "title": "Test chat - A", 
        "is_direct_chat": "true",
        }
    headers = {
    'Project-ID': project_id,
    'User-Name': 'f@f.com',
    'User-Secret': '123123'
    }

    response = requests.request("POST", url, headers=headers, data=payload)

    print(response.text)



# ----------------------------------------------------------------
# Tests
# ----------------------------------------------------------------

#add_user()
#add_user("userName", "firstName", "lastName")

new_chat_3()

