 git_pull_current_branch(){
     head=$(< .git/HEAD)
     git_branch=''
     echo $head
     if [[ $head = ref:\ refs/heads/* ]]; then
         git_branch="${head#*/*/}"
     elif [[ $head != '' ]]; then
         git_branch=" "
     else
         git_branch=" "
     fi
     echo git pull origin $git_branch
     git pull origin $git_branch
 }
 git_push_current_branch(){
     head=$(< .git/HEAD)
     git_branch=''
     echo $head
     if [[ $head = ref:\ refs/heads/* ]]; then
         git_branch="${head#*/*/}"
     elif [[ $head != '' ]]; then
         git_branch=" "
     else
         git_branch=" "
     fi
     echo git push origin $git_branch
     git push origin $git_branch
 }

 #alias gpull="find_current_branch;echo git pull origin $git_branch;git pull origin $git_branch"
 #alias gpush="find_current_branch;echo git push origin $git_branch;git push origin $git_branch"

 alias gpull="git_pull_current_branch"
 alias gpush="git_push_current_branch"

