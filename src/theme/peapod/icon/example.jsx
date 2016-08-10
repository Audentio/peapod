import React from 'react';
import { ContentWrap, Icon } from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

import Pod_Vars from 'utility/vars.js';

const colorPalette = Pod_Vars.get('palette');
const colorKeys = Object.keys(colorPalette);
const numColors = colorKeys.length;

const randomColor = function () {
    const index = Math.floor((Math.random() * numColors));
    return colorPalette[colorKeys[index]];
};

module.exports = class IconExample extends React.Component {

    shouldComponentUpdate = PureRender;

    render() {
        return (
            <div>
                <ContentWrap>
                    <span style={{ fontSize: '30px' }}>
                        <Icon>home</Icon>&nbsp;
                        <Icon styler={{ color: '#07ADD4', size: '10rem' }}>assessment</Icon>&nbsp;
                        <Icon styler={{ color: '#3F70E2' }}>polymer</Icon>&nbsp;
                        <Icon styler={{ color: '#D53FD6' }}>question_answer</Icon>&nbsp;
                        <Icon styler={{ color: '#FF6044' }}>whatshot</Icon>

                        <Icon styler={{ style: { color: '#FF6044' } }}>whatshot</Icon>

                        <br /><br />

                        <Icon styler={{ color: randomColor() }}>info_outline</Icon>
                        <Icon styler={{ color: randomColor() }}>input</Icon>
                        <Icon styler={{ color: randomColor() }}>invert_colors</Icon>
                        <Icon styler={{ color: randomColor() }}>label</Icon>
                        <Icon styler={{ color: randomColor() }}>label_outline</Icon>
                        <Icon styler={{ color: randomColor() }}>language</Icon>
                        <Icon styler={{ color: randomColor() }}>query_builder</Icon>
                        <Icon styler={{ color: randomColor() }}>perm_identity</Icon>
                        <Icon styler={{ color: randomColor() }}>perm_media</Icon>
                        <Icon styler={{ color: randomColor() }}>perm_phone_msg</Icon>
                        <Icon styler={{ color: randomColor() }}>perm_scan_wifi</Icon>
                        <Icon styler={{ color: randomColor() }}>picture_in_picture</Icon>
                        <Icon styler={{ color: randomColor() }}>play_for_work</Icon>
                        <Icon styler={{ color: randomColor() }}>polymer</Icon>
                        <Icon styler={{ color: randomColor() }}>power_settings_new</Icon>
                        <Icon styler={{ color: randomColor() }}>print</Icon>
                        <Icon styler={{ color: randomColor() }}>thumb_down</Icon>
                        <Icon styler={{ color: randomColor() }}>thumb_up</Icon>
                        <Icon styler={{ color: randomColor() }}>thumbs_up_down</Icon>
                        <Icon styler={{ color: randomColor() }}>email</Icon>
                        <Icon styler={{ color: randomColor() }}>dialpad</Icon>
                        <Icon styler={{ color: randomColor() }}>dialer_sip</Icon>
                        <Icon styler={{ color: randomColor() }}>contacts</Icon>
                        <Icon styler={{ color: randomColor() }}>forward_5</Icon>
                        <Icon styler={{ color: randomColor() }}>stay_current_portrait</Icon>
                        <Icon styler={{ color: randomColor() }}>stay_primary_landscape</Icon>
                        <Icon styler={{ color: randomColor() }}>stay_primary_portrait</Icon>
                        <Icon styler={{ color: randomColor() }}>swap_calls</Icon>
                        <Icon styler={{ color: randomColor() }}>textsms</Icon>
                        <Icon styler={{ color: randomColor() }}>voicemail</Icon>
                        <Icon styler={{ color: randomColor() }}>vpn_key</Icon>
                        <Icon styler={{ color: randomColor() }}>group_work</Icon>
                        <Icon styler={{ color: randomColor() }}>grade</Icon>
                        <Icon styler={{ color: randomColor() }}>clear_all</Icon>
                        <Icon styler={{ color: randomColor() }}>chat_bubble_outline</Icon>
                        <Icon styler={{ color: randomColor() }}>chat_bubble</Icon>
                        <Icon styler={{ color: randomColor() }}>repeat</Icon>
                        <Icon styler={{ color: randomColor() }}>repeat_one</Icon>
                        <Icon styler={{ color: randomColor() }}>replay</Icon>
                        <Icon styler={{ color: randomColor() }}>replay_10</Icon>
                        <Icon styler={{ color: randomColor() }}>replay_30</Icon>
                        <Icon styler={{ color: randomColor() }}>replay_5</Icon>
                        <Icon styler={{ color: randomColor() }}>shuffle</Icon>
                        <Icon styler={{ color: randomColor() }}>skip_next</Icon>
                        <Icon styler={{ color: randomColor() }}>skip_previous</Icon>
                        <Icon styler={{ color: randomColor() }}>contact_phone</Icon>
                        <Icon styler={{ color: randomColor() }}>comment</Icon>
                        <Icon styler={{ color: randomColor() }}>recent_actors</Icon>
                        <Icon styler={{ color: randomColor() }}>snooze</Icon>
                        <Icon styler={{ color: randomColor() }}>sort_by_alpha</Icon>
                        <Icon styler={{ color: randomColor() }}>stop</Icon>
                        <Icon styler={{ color: randomColor() }}>subtitles</Icon>
                        <Icon styler={{ color: randomColor() }}>surround_sound</Icon>
                        <Icon styler={{ color: randomColor() }}>web</Icon>
                        <Icon styler={{ color: randomColor() }}>volume_up</Icon>
                        <Icon styler={{ color: randomColor() }}>volume_off</Icon>
                        <Icon styler={{ color: randomColor() }}>volume_mute</Icon>
                        <Icon styler={{ color: randomColor() }}>toc</Icon>
                        <Icon styler={{ color: randomColor() }}>today</Icon>
                        <Icon styler={{ color: randomColor() }}>toll</Icon>
                        <Icon styler={{ color: randomColor() }}>track_changes</Icon>
                        <Icon styler={{ color: randomColor() }}>translate</Icon>
                        <Icon styler={{ color: randomColor() }}>trending_down</Icon>
                        <Icon styler={{ color: randomColor() }}>question_answer</Icon>
                        <Icon styler={{ color: randomColor() }}>receipt</Icon>
                        <Icon styler={{ color: randomColor() }}>done</Icon>
                        <Icon styler={{ color: randomColor() }}>tab</Icon>
                        <Icon styler={{ color: randomColor() }}>tab_unselected</Icon>
                        <Icon styler={{ color: randomColor() }}>theaters</Icon>
                        <Icon styler={{ color: randomColor() }}>hd</Icon>
                        <Icon styler={{ color: randomColor() }}>games</Icon>
                        <Icon styler={{ color: randomColor() }}>hearing</Icon>
                        <Icon styler={{ color: randomColor() }}>view_module</Icon>
                        <Icon styler={{ color: randomColor() }}>view_list</Icon>
                        <Icon styler={{ color: randomColor() }}>settings_remote</Icon>
                        <Icon styler={{ color: randomColor() }}>settings_voice</Icon>
                        <Icon styler={{ color: randomColor() }}>search</Icon>
                        <Icon styler={{ color: randomColor() }}>settings</Icon>
                        <Icon styler={{ color: randomColor() }}>settings_applications</Icon>
                        <Icon styler={{ color: randomColor() }}>settings_backup_restore</Icon>
                        <Icon styler={{ color: randomColor() }}>settings_bluetooth</Icon>
                        <Icon styler={{ color: randomColor() }}>settings_brightness</Icon>
                        <Icon styler={{ color: randomColor() }}>settings_cell</Icon>
                        <Icon styler={{ color: randomColor() }}>settings_ethernet</Icon>
                        <Icon styler={{ color: randomColor() }}>settings_input_antenna</Icon>
                        <Icon styler={{ color: randomColor() }}>trending_flat</Icon>
                        <Icon styler={{ color: randomColor() }}>trending_up</Icon>
                        <Icon styler={{ color: randomColor() }}>work</Icon>
                        <Icon styler={{ color: randomColor() }}>youtube_searched_for</Icon>
                        <Icon styler={{ color: randomColor() }}>zoom_in</Icon>
                        <Icon styler={{ color: randomColor() }}>my_location</Icon>
                        <Icon styler={{ color: randomColor() }}>visibility_off</Icon>
                        <Icon styler={{ color: randomColor() }}>visibility</Icon>
                        <Icon styler={{ color: randomColor() }}>view_week</Icon>
                        <Icon styler={{ color: randomColor() }}>view_stream</Icon>
                        <Icon styler={{ color: randomColor() }}>view_quilt</Icon>
                        <Icon styler={{ color: randomColor() }}>video_library</Icon>
                        <Icon styler={{ color: randomColor() }}>videocam</Icon>
                        <Icon styler={{ color: randomColor() }}>videocam_off</Icon>
                        <Icon styler={{ color: randomColor() }}>volume_down</Icon>
                        <Icon styler={{ color: randomColor() }}>settings_overscan</Icon>
                        <Icon styler={{ color: randomColor() }}>settings_input_svideo</Icon>
                        <Icon styler={{ color: randomColor() }}>settings_input_hdmi</Icon>
                        <Icon styler={{ color: randomColor() }}>settings_input_composite</Icon>
                        <Icon styler={{ color: randomColor() }}>settings_input_component</Icon>
                        <Icon styler={{ color: randomColor() }}>launch</Icon>
                        <Icon styler={{ color: randomColor() }}>perm_device_information</Icon>
                        <Icon styler={{ color: randomColor() }}>perm_data_setting</Icon>
                        <Icon styler={{ color: randomColor() }}>zoom_out</Icon>
                        <Icon styler={{ color: randomColor() }}>alarm_on</Icon>
                        <Icon styler={{ color: randomColor() }}>dns</Icon>
                        <Icon styler={{ color: randomColor() }}>redeem</Icon>
                        <Icon styler={{ color: randomColor() }}>reorder</Icon>
                        <Icon styler={{ color: randomColor() }}>report_problem</Icon>
                        <Icon styler={{ color: randomColor() }}>restore</Icon>
                        <Icon styler={{ color: randomColor() }}>room</Icon>
                        <Icon styler={{ color: randomColor() }}>schedule</Icon>
                        <Icon styler={{ color: randomColor() }}>movie</Icon>
                        <Icon styler={{ color: randomColor() }}>android</Icon>
                        <Icon styler={{ color: randomColor() }}>announcement</Icon>
                        <Icon styler={{ color: randomColor() }}>mic_off</Icon>
                        <Icon styler={{ color: randomColor() }}>mic_none</Icon>
                        <Icon styler={{ color: randomColor() }}>swap_horiz</Icon>
                        <Icon styler={{ color: randomColor() }}>swap_vert</Icon>
                        <Icon styler={{ color: randomColor() }}>swap_vertical_circle</Icon>
                        <Icon styler={{ color: randomColor() }}>system_update_alt</Icon>
                        <Icon styler={{ color: randomColor() }}>present_to_all</Icon>
                        <Icon styler={{ color: randomColor() }}>portable_wifi_off</Icon>
                        <Icon styler={{ color: randomColor() }}>phonelink_setup</Icon>
                        <Icon styler={{ color: randomColor() }}>phonelink_ring</Icon>
                        <Icon styler={{ color: randomColor() }}>phonelink_lock</Icon>
                        <Icon styler={{ color: randomColor() }}>phonelink_erase</Icon>
                        <Icon styler={{ color: randomColor() }}>person_pin</Icon>
                        <Icon styler={{ color: randomColor() }}>navigation</Icon>
                        <Icon styler={{ color: randomColor() }}>new_releases</Icon>
                        <Icon styler={{ color: randomColor() }}>not_interested</Icon>
                        <Icon styler={{ color: randomColor() }}>pause</Icon>
                        <Icon styler={{ color: randomColor() }}>pause_circle_filled</Icon>
                        <Icon styler={{ color: randomColor() }}>pause_circle_outline</Icon>
                        <Icon styler={{ color: randomColor() }}>play_arrow</Icon>
                        <Icon styler={{ color: randomColor() }}>play_circle_filled</Icon>
                        <Icon styler={{ color: randomColor() }}>play_circle_outline</Icon>
                        <Icon styler={{ color: randomColor() }}>playlist_add</Icon>
                        <Icon styler={{ color: randomColor() }}>queue</Icon>
                        <Icon styler={{ color: randomColor() }}>queue_music</Icon>
                        <Icon styler={{ color: randomColor() }}>radio</Icon>
                        <Icon styler={{ color: randomColor() }}>class</Icon>
                        <Icon styler={{ color: randomColor() }}>code</Icon>
                        <Icon styler={{ color: randomColor() }}>credit_card</Icon>
                        <Icon styler={{ color: randomColor() }}>dashboard</Icon>
                        <Icon styler={{ color: randomColor() }}>delete</Icon>
                        <Icon styler={{ color: randomColor() }}>description</Icon>
                        <Icon styler={{ color: randomColor() }}>open_with</Icon>
                        <Icon styler={{ color: randomColor() }}>pageview</Icon>
                        <Icon styler={{ color: randomColor() }}>payment</Icon>
                        <Icon styler={{ color: randomColor() }}>perm_camera_mic</Icon>
                        <Icon styler={{ color: randomColor() }}>perm_contact_calendar</Icon>
                        <Icon styler={{ color: randomColor() }}>airplay</Icon>
                        <Icon styler={{ color: randomColor() }}>done_all</Icon>
                        <Icon styler={{ color: randomColor() }}>phone</Icon>
                        <Icon styler={{ color: randomColor() }}>no_sim</Icon>
                        <Icon styler={{ color: randomColor() }}>invert_colors_off</Icon>
                        <Icon styler={{ color: randomColor() }}>chat</Icon>
                        <Icon styler={{ color: randomColor() }}>call_split</Icon>
                        <Icon styler={{ color: randomColor() }}>call_received</Icon>
                        <Icon styler={{ color: randomColor() }}>call_missed</Icon>
                        <Icon styler={{ color: randomColor() }}>call_merge</Icon>
                        <Icon styler={{ color: randomColor() }}>call_made</Icon>
                        <Icon styler={{ color: randomColor() }}>call_end</Icon>
                        <Icon styler={{ color: randomColor() }}>call</Icon>
                        <Icon styler={{ color: randomColor() }}>business</Icon>
                        <Icon styler={{ color: randomColor() }}>alarm_off</Icon>
                        <Icon styler={{ color: randomColor() }}>message</Icon>
                        <Icon styler={{ color: randomColor() }}>location_on</Icon>
                        <Icon styler={{ color: randomColor() }}>location_off</Icon>
                        <Icon styler={{ color: randomColor() }}>live_help</Icon>
                        <Icon styler={{ color: randomColor() }}>album</Icon>
                        <Icon styler={{ color: randomColor() }}>av_timer</Icon>
                        <Icon styler={{ color: randomColor() }}>closed_caption</Icon>
                        <Icon styler={{ color: randomColor() }}>equalizer</Icon>
                        <Icon styler={{ color: randomColor() }}>turned_in_not</Icon>
                        <Icon styler={{ color: randomColor() }}>verified_user</Icon>
                        <Icon styler={{ color: randomColor() }}>view_agenda</Icon>
                        <Icon styler={{ color: randomColor() }}>view_array</Icon>
                        <Icon styler={{ color: randomColor() }}>view_carousel</Icon>
                        <Icon styler={{ color: randomColor() }}>view_column</Icon>
                        <Icon styler={{ color: randomColor() }}>subject</Icon>
                        <Icon styler={{ color: randomColor() }}>supervisor_account</Icon>
                        <Icon styler={{ color: randomColor() }}>settings_power</Icon>
                        <Icon styler={{ color: randomColor() }}>shop</Icon>
                        <Icon styler={{ color: randomColor() }}>shop_two</Icon>
                        <Icon styler={{ color: randomColor() }}>shopping_basket</Icon>
                        <Icon styler={{ color: randomColor() }}>shopping_cart</Icon>
                        <Icon styler={{ color: randomColor() }}>speaker_notes</Icon>
                        <Icon styler={{ color: randomColor() }}>spellcheck</Icon>
                        <Icon styler={{ color: randomColor() }}>star_rate</Icon>
                        <Icon styler={{ color: randomColor() }}>stars</Icon>
                        <Icon styler={{ color: randomColor() }}>store</Icon>
                        <Icon styler={{ color: randomColor() }}>ring_volume</Icon>
                        <Icon styler={{ color: randomColor() }}>speaker_phone</Icon>
                        <Icon styler={{ color: randomColor() }}>stay_current_landscape</Icon>
                        <Icon styler={{ color: randomColor() }}>forum</Icon>
                        <Icon styler={{ color: randomColor() }}>import_export</Icon>
                        <Icon styler={{ color: randomColor() }}>open_in_browser</Icon>
                        <Icon styler={{ color: randomColor() }}>open_in_new</Icon>
                        <Icon styler={{ color: randomColor() }}>forward_30</Icon>
                        <Icon styler={{ color: randomColor() }}>turned_in</Icon>
                        <Icon styler={{ color: randomColor() }}>view_headline</Icon>
                        <Icon styler={{ color: randomColor() }}>view_day</Icon>
                        <Icon styler={{ color: randomColor() }}>warning</Icon>
                        <Icon styler={{ color: randomColor() }}>error_outline</Icon>
                        <Icon styler={{ color: randomColor() }}>error</Icon>
                        <Icon styler={{ color: randomColor() }}>add_alert</Icon>
                        <Icon styler={{ color: randomColor() }}>settings_phone</Icon>
                        <Icon styler={{ color: randomColor() }}>forward_10</Icon>
                        <Icon styler={{ color: randomColor() }}>fast_rewind</Icon>
                        <Icon styler={{ color: randomColor() }}>fast_forward</Icon>
                        <Icon styler={{ color: randomColor() }}>explicit</Icon>
                        <Icon styler={{ color: randomColor() }}>list</Icon>
                        <Icon styler={{ color: randomColor() }}>lock</Icon>
                        <Icon styler={{ color: randomColor() }}>lock_open</Icon>
                        <Icon styler={{ color: randomColor() }}>lock_outline</Icon>
                        <Icon styler={{ color: randomColor() }}>loyalty</Icon>
                        <Icon styler={{ color: randomColor() }}>markunread_mailbox</Icon>
                        <Icon styler={{ color: randomColor() }}>note_add</Icon>
                        <Icon styler={{ color: randomColor() }}>offline_pin</Icon>
                        <Icon styler={{ color: randomColor() }}>http</Icon>
                        <Icon styler={{ color: randomColor() }}>mic</Icon>
                        <Icon styler={{ color: randomColor() }}>loop</Icon>
                        <Icon styler={{ color: randomColor() }}>library_music</Icon>
                        <Icon styler={{ color: randomColor() }}>library_books</Icon>
                        <Icon styler={{ color: randomColor() }}>library_add</Icon>
                        <Icon styler={{ color: randomColor() }}>high_quality</Icon>
                        <Icon styler={{ color: randomColor() }}>info</Icon>
                        <Icon styler={{ color: randomColor() }}>https</Icon>
                        <Icon styler={{ color: randomColor() }}>aspect_ratio</Icon>
                        <Icon styler={{ color: randomColor() }}>assessment</Icon>
                        <Icon styler={{ color: randomColor() }}>assignment</Icon>
                        <Icon styler={{ color: randomColor() }}>assignment_ind</Icon>
                        <Icon styler={{ color: randomColor() }}>assignment_late</Icon>
                        <Icon styler={{ color: randomColor() }}>mode_edit</Icon>
                    </span>

                </ContentWrap>
            </div>
        );
    }
};
