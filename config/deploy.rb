# config valid only for current version of Capistrano
#lock '3.6.1'

set :application, 'fera-guideline'
set :repo_url, 'git@bitbucket.org:coffeecup/fera-guideline.git'

# Default branch is :master
ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
# set :deploy_to, '/var/www/my_app_name'

# Default value for :scm is :git
# set :scm, :git

# Default value for :format is :pretty
# set :format, :pretty

# Default value for :log_level is :debug
# set :log_level, :debug

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# set :linked_files, fetch(:linked_files, []).push('config/database.yml', 'config/secrets.yml')
# set :linked_files, fetch(:linked_files, []).push('wp-config.php')

# Default value for linked_dirs is []
# set :linked_dirs, fetch(:linked_dirs, []).push('log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle', 'public/system')
# set :linked_files, fetch(:linked_files, []).push('wp-config.php')

#set :linked_dirs, fetch(:linked_dirs, [])
#   .push("wp-content/uploads")
# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for keep_releases is 5
set :keep_releases, 2

namespace :deploy do

  desc 'move environment file'
  task :vai_fera do

    on roles(:staging), in: :sequence, wait: 5 do
      #execute "cd #{release_path}; mv .env.staging .env;"
    end

    on roles(:production), in: :sequence, wait: 5 do
      #execute "cd #{release_path}; mv .env.production .env;"
    end

    on roles(:app, :staging, :production), in: :sequence, wait: 5 do
        #execute "cd #{release_path}; composer update;"
        #execute "cd #{release_path}; bower install --allow-root"
        # execute "cd #{release_path}/wp-content; chmod -R 777 uploads/;"
    end
  end

  before :publishing, :vai_fera
  after :publishing, :restart

  after :restart, :clear_cache do
    on roles(:web), in: :groups, limit: 3, wait: 10 do
      # Here we can do anything such as:
      # within release_path do
      #   execute :rake, 'cache:clear'
      # end
    end

    on roles(:production), in: :sequence, wait: 5 do
      execute "service php5-fpm restart"
    end
  end

end
