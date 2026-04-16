import shutil
import os

source_path_A = r"C:\Users\Мурат\.gemini\antigravity\brain\71308ab2-405c-4e05-9dbc-daa77a6d0275\icon_test_a_1776342802001.png"
source_path_B = r"C:\Users\Мурат\.gemini\antigravity\brain\71308ab2-405c-4e05-9dbc-daa77a6d0275\icon_test_b_1776342826458.png"

dest_A = r"C:\Users\Мурат\Desktop\сайт\img\icon_test_a.png"
dest_B = r"C:\Users\Мурат\Desktop\сайт\img\icon_test_b.png"
main_dest = r"C:\Users\Мурат\Desktop\сайт\img\icon_test.png"

shutil.copy2(source_path_A, dest_A)
shutil.copy2(source_path_B, dest_B)
shutil.copy2(source_path_A, main_dest) # Default copy A to main
print("Copy completed.")
