module ApplicationHelper

  def is_older_than_ie8
    @is_older_than_ie8 ||= request.env['HTTP_USER_AGENT'].downcase =~ /msie/i && !request.env['HTTP_USER_AGENT'].downcase.index('msie 9')
  end
end
