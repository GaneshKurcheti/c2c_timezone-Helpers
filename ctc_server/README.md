# README

Server to test the ctoc_timezone functionality.



Steps to debug:

1) Pull the latest changes form repo.

Gem level changes:

2) Make changes to the ctoc_timezone\lib\ctoc_timezone\instance_methods.rb(or ctoc_timezone\lib\ctoc_timezone\class_methods.rb)

3) Build the gem using the command `gem build ctoc_timezone.gemspec` 

4) Install the gem into local using `gem install ctoc_timezone`

Server level changes:

5) Run bundle install by making sure you have `gem "ctoc_timezone"` in Gemfile.rb

6) Run the server `rails s --port 4522`

7) Debug using the byebug(which comes by default in the rails app, just add `byebug` where you need o debug similar to `binding.pry`)
