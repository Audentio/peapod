import React from 'react';
import Pod from 'utility/components.js';
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
                <Pod.ContentWrap>
                    <span style={{ fontSize: '30px' }}>
                        <Pod.Icon>home</Pod.Icon>&nbsp;
                        <Pod.Icon styler={{ color: '#07ADD4', size: '10rem' }}>assessment</Pod.Icon>&nbsp;
                        <Pod.Icon styler={{ color: '#3F70E2' }}>polymer</Pod.Icon>&nbsp;
                        <Pod.Icon styler={{ color: '#D53FD6' }}>question_answer</Pod.Icon>&nbsp;
                        <Pod.Icon styler={{ color: '#FF6044' }}>whatshot</Pod.Icon>

                        <Pod.Icon styler={{ style: { color: '#FF6044' } }}>whatshot</Pod.Icon>

                        <br /><br />

                        <Pod.Icon styler={{ color: randomColor() }}>info_outline</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>input</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>invert_colors</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>label</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>label_outline</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>language</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>query_builder</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>perm_identity</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>perm_media</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>perm_phone_msg</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>perm_scan_wifi</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>picture_in_picture</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>play_for_work</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>polymer</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>power_settings_new</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>print</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>thumb_down</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>thumb_up</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>thumbs_up_down</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>email</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>dialpad</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>dialer_sip</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>contacts</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>forward_5</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>stay_current_portrait</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>stay_primary_landscape</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>stay_primary_portrait</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>swap_calls</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>textsms</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>voicemail</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>vpn_key</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>group_work</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>grade</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>clear_all</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>chat_bubble_outline</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>chat_bubble</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>repeat</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>repeat_one</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>replay</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>replay_10</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>replay_30</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>replay_5</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>shuffle</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>skip_next</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>skip_previous</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>contact_phone</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>comment</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>recent_actors</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>snooze</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>sort_by_alpha</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>stop</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>subtitles</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>surround_sound</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>web</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>volume_up</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>volume_off</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>volume_mute</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>toc</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>today</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>toll</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>track_changes</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>translate</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>trending_down</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>question_answer</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>receipt</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>done</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>tab</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>tab_unselected</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>theaters</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>hd</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>games</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>hearing</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>view_module</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>view_list</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>settings_remote</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>settings_voice</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>search</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>settings</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>settings_applications</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>settings_backup_restore</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>settings_bluetooth</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>settings_brightness</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>settings_cell</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>settings_ethernet</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>settings_input_antenna</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>trending_flat</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>trending_up</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>work</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>youtube_searched_for</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>zoom_in</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>my_location</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>visibility_off</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>visibility</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>view_week</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>view_stream</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>view_quilt</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>video_library</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>videocam</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>videocam_off</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>volume_down</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>settings_overscan</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>settings_input_svideo</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>settings_input_hdmi</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>settings_input_composite</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>settings_input_component</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>launch</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>perm_device_information</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>perm_data_setting</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>zoom_out</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>alarm_on</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>dns</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>redeem</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>reorder</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>report_problem</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>restore</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>room</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>schedule</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>movie</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>android</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>announcement</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>mic_off</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>mic_none</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>swap_horiz</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>swap_vert</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>swap_vertical_circle</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>system_update_alt</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>present_to_all</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>portable_wifi_off</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>phonelink_setup</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>phonelink_ring</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>phonelink_lock</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>phonelink_erase</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>person_pin</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>navigation</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>new_releases</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>not_interested</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>pause</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>pause_circle_filled</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>pause_circle_outline</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>play_arrow</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>play_circle_filled</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>play_circle_outline</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>playlist_add</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>queue</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>queue_music</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>radio</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>class</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>code</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>credit_card</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>dashboard</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>delete</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>description</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>open_with</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>pageview</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>payment</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>perm_camera_mic</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>perm_contact_calendar</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>airplay</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>done_all</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>phone</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>no_sim</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>invert_colors_off</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>chat</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>call_split</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>call_received</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>call_missed</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>call_merge</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>call_made</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>call_end</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>call</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>business</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>alarm_off</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>message</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>location_on</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>location_off</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>live_help</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>album</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>av_timer</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>closed_caption</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>equalizer</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>turned_in_not</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>verified_user</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>view_agenda</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>view_array</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>view_carousel</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>view_column</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>subject</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>supervisor_account</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>settings_power</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>shop</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>shop_two</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>shopping_basket</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>shopping_cart</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>speaker_notes</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>spellcheck</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>star_rate</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>stars</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>store</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>ring_volume</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>speaker_phone</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>stay_current_landscape</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>forum</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>import_export</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>open_in_browser</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>open_in_new</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>forward_30</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>turned_in</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>view_headline</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>view_day</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>warning</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>error_outline</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>error</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>add_alert</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>settings_phone</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>forward_10</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>fast_rewind</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>fast_forward</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>explicit</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>list</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>lock</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>lock_open</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>lock_outline</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>loyalty</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>markunread_mailbox</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>note_add</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>offline_pin</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>http</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>mic</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>loop</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>library_music</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>library_books</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>library_add</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>high_quality</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>info</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>https</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>aspect_ratio</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>assessment</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>assignment</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>assignment_ind</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>assignment_late</Pod.Icon>
                        <Pod.Icon styler={{ color: randomColor() }}>mode_edit</Pod.Icon>
                    </span>

                </Pod.ContentWrap>
            </div>
        );
    }
};
