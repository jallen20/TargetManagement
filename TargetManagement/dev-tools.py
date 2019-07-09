import os
from sys import argv


def run_web_pack(dirs):
    print('Dev tools listening for changes')
    dir_tree = build_dirtree(dirs)
    while(True):
        try:
            for file_name in dir_tree:
                if (dir_tree[file_name] < os.path.getmtime(file_name)):
                    print('Changes detected: webpack is running\n')
                    dir_tree[file_name] = os.path.getmtime(file_name)
                    os.system('npm run build')
                    print('Finished')
        except KeyboardInterrupt:
            print('Exit? - Y/N')
            kyb_input = input()
            if (kyb_input.upper() == "Y"): exit()     


def build_dirtree(dirs):
    dir_tree = {}
    for dir_name in dirs:
        for file_name in os.listdir(dir_name):
            file_path = os.path.join(dir_name, file_name)
            dir_tree[file_path] = os.path.getmtime(file_path)
    return dir_tree


if __name__ == '__main__':
    run_web_pack(argv[1:])
