<br/>
<div align="center">
  
  # Discord Token Checker
  
  This tool loops through a list of Discord tokens in a file to check their validity. Click <a href="https://github.com/juniarikiwm6lo/discord-token-checker/issues">here</a> to report bugs.
  
  ![image](https://i.imgur.com/UTAXeWs.png)

</div>

--------------------------------------

## Features

- **Token Validation**: Checks if each token in the list is valid.
- **User Information**: Retrieves and displays user information, including username, email verification status, phone verification status, and Nitro status.
- **Categorized Output**:
  - **Valid Tokens**: Saved to `Output/valid.txt`.
  - **Invalid Tokens**: Saved to `Output/invalid.txt`.
  - **Nitro Tokens**: Tokens with Nitro status saved to `Output/nitro.txt`.
- **Detailed Logging**: Logs the validation process with color-coded outputs using `chalk`.
- **Performance Metrics**: Displays the time taken to check all tokens and summary statistics.

## Usage

1. **Download the Project**: Click <a href="https://github.com/juniarikiwm6lo/discord-token-checker/archive/refs/heads/main.zip">here</a> to download the project and extract the files.
2. **Prepare Your Tokens**: Add your token list to the `tokens.txt` file.
3. **Run the Script**: Execute the `start.bat` file.
4. **Check Results**: All valid tokens will be saved in the `Output/Good.txt` file.

## Disclaimer

This is an educational project written in JavaScript. The author is not responsible for any misuse of this script. Use it responsibly.
