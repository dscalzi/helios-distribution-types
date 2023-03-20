import { Platform, Architecture } from './system'

/**
 * Supported JDK Distributions
 * 
 * @since 1.2.0
 */
export enum JdkDistribution {
    /**
     * Amazon Corretto
     * @see https://aws.amazon.com/corretto/
     * @since 1.2.0
     */
    CORRETTO = 'CORRETTO',
    /**
     * Eclipse Temurin
     * @see https://projects.eclipse.org/projects/adoptium.temurin
     * @since 1.2.0
     */
    TEMURIN = 'TEMURIN',
}

/**
 * Properties used to specify version information.
 * @since 1.2.0
 */
export interface JavaVersionProps {
    /**
     * Preferred JDK distribution to download if no applicable installation could
     * be found.
     * If omitted, the client will decide (decision may be platform-specific).
     * @since 1.2.0
     */
    distribution?: JdkDistribution

    /**
     * A semver range of supported JDK versions.
     * 
     * Java version syntax is platform dependent.
     * 
     * JDK 8 and prior
     * 1.{major}.{minor}_{patch}-b{build}
     * Ex. 1.8.0_152-b16
     * 
     * JDK 9+
     * {major}.{minor}.{patch}+{build}
     * Ex. 11.0.12+7
     * 
     * For processing, all versions will be translated into a
     * semver compliant string. JDK 9+ is already semver. For
     * versions 8 and below, 1.{major}.{minor}_{patch}-b{build}
     * will be translated to {major}.{minor}.{patch}+{build}.
     * 
     * If specified, you must also specify suggestedMajor.
     * 
     * If omitted, the client will decide based on the game version.
     * @see https://github.com/npm/node-semver#ranges
     * @since 1.2.0
     */
    supported?: string

    /**
     * The suggested major Java version. The suggested major
     * should comply with the version range specified by supported,
     * if defined. This will be used in messages displayed to the
     * end user, and to automatically fetch a Java version.
     * 
     * NOTE If supported is specified, suggestedMajor must be set.
     * The launcher's default value may not comply with your custom
     * major supported range.
     * 
     * Common use case:
     * supported: >=17.x
     * suggestedMajor: 17
     * 
     * More involved:
     * supported: >=16 <20
     * suggestedMajor: 17
     * 
     * Given a wider support range, it becomes necessary to specify which
     * major version in the range is the suggested.
     * @since 1.2.0
     */
    suggestedMajor?: number
}

/**
 * Java validation rules for a specific platform.
 * 
 * @since 1.2.0
 */
export interface JavaPlatformOptions extends JavaVersionProps {
    /**
     * The platform that this validation matrix applies to.
     * @since 1.2.0
     */
    platform: Platform
    /**
     * The architecture that this validation matrix applies to.
     * If omitted, applies to all architectures.
     * @since 1.2.0
     */
    architecture?: Architecture
}

/**
 * Java options.
 * @since 1.2.0
 */
export interface JavaOptions extends JavaVersionProps {

    /**
     * Platform-specific java rules for this server configuration.
     * Validation rules will be delegated to the client for
     * any undefined properties. Java validation can be configured
     * for specific platforms and architectures. The most specific
     * ruleset will be applied.
     * 
     * Maxtrix Precedence (Highest - Lowest)
     * - Current platform, current architecture (ex. win32 x64)
     * - Current platform, any architecture (ex. win32)
     * - Java Options base properties (defined on this object)
     * - Client logic (default logic in the client)
     * 
     * @since 1.2.0
     */
    platformOptions?: JavaPlatformOptions[]

    /**
     * RAM settings.
     * If omitted, legacy client logic will be used to determine these values.
     * @since 1.2.0
     */
    ram?: {
        /**
         * The recommended amount of RAM in megabytes. Must be an interval of 512.
         * @since 1.2.0
         */
        recommended: number
        /**
         * The absolute minimum amount of RAM in megabytes. Must be an interval of 512.
         * @since 1.2.0
         */
        minimum: number
    }

}