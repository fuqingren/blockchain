/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* global getAssetRegistry getFactory */

/**
 * Publish a new transcript
 * @param {org.fordham.education.PublishTranscript} publishTranscript - the publishTranscript transaction
 * @transaction
 */
async function publish(publishTranscript) {  // eslint-disable-line no-unused-vars

    const registry = await getAssetRegistry('org.fordham.education.transcript');
    const factory = getFactory();

    // Create the bond asset.
    const transcript = factory.newResource('org.fordham.education', 'transcript', PublishTranscript.transcriptId);
    transcript.record = PublishTranscript.record;

    // Add the bond asset to the registry.
    await registry.add(transcript);
}